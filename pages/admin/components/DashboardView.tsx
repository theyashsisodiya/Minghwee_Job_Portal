import React, { useState, useMemo, useRef, useCallback } from 'react';
import { MOCK_ADMIN_STATS } from '../../../constants';

const StatCard: React.FC<{ label: string; value: string | number; change?: string; isPositive?: boolean }> = ({ label, value, change, isPositive }) => (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
        <p className="text-sm font-medium text-gray-500">{label}</p>
        <div className="flex items-end justify-between mt-2">
            <p className="text-3xl font-bold text-gray-900">{value.toLocaleString()}</p>
            {change && (
                <span className={`text-xs font-semibold px-2 py-1 rounded-full ${isPositive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                    {change}
                </span>
            )}
        </div>
    </div>
);

type TimeFilter = '1W' | '1M' | '6M' | '1Y';

const StatsAreaChart: React.FC = () => {
    const [filter, setFilter] = useState<TimeFilter>('1Y');
    const [hoverData, setHoverData] = useState<{ index: number; x: number; series: { name: string; value: number; color: string; y: number }[] } | null>(null);
    const [zoomRange, setZoomRange] = useState<{ start: number, end: number } | null>(null);
    const [dragRange, setDragRange] = useState<{ start: number | null, end: number | null }>({ start: null, end: null });
    
    const isDragging = useRef(false);
    const chartContainerRef = useRef<HTMLDivElement>(null);
    const chartRef = useRef<SVGSVGElement>(null);

    const getDataForFilter = (series: { week: number[], month: number[], year: number[] }) => {
        switch(filter) {
            case '1W': return series.week;
            case '1M': return series.month;
            case '6M': return series.year.slice(6);
            case '1Y': return series.year;
            default: return series.year;
        }
    };
    
    const { displayedData, maxVal, originalDataLength } = useMemo(() => {
        const seriesMap = {
            'Active Jobs': { data: MOCK_ADMIN_STATS.activeJobsSeries, color: '#3B82F6' },
            'Candidates Hired': { data: MOCK_ADMIN_STATS.candidatesHired, color: '#10B981' },
            'Employers': { data: MOCK_ADMIN_STATS.employerGrowth, color: '#8B5CF6' },
            'Sales': { data: MOCK_ADMIN_STATS.sales, color: '#F59E0B' }
        };

        const originalSeries = Object.entries(seriesMap).map(([name, { data, color }]) => ({
            name,
            color,
            points: getDataForFilter(data)
        }));
        
        const originalLength = originalSeries[0]?.points.length || 1;

        let processedData = originalSeries;
        if (zoomRange && (zoomRange.end > zoomRange.start)) {
             processedData = originalSeries.map(series => ({
                ...series,
                points: series.points.slice(zoomRange.start, zoomRange.end + 1)
            }));
        }

        const allValues = processedData.flatMap(s => s.points);
        const effectiveMaxVal = Math.max(...allValues, 0) * 1.2 || 100;

        return { displayedData: processedData, maxVal: effectiveMaxVal, originalDataLength: originalLength };
    }, [filter, zoomRange]);

    const SVG_WIDTH = 800;
    const SVG_HEIGHT = 400;
    const margin = { top: 20, right: 20, bottom: 30, left: 80 };
    const width = SVG_WIDTH - margin.left - margin.right;
    const height = SVG_HEIGHT - margin.top - margin.bottom;

    const getCoords = (value: number, index: number, totalPoints: number) => {
        const x = totalPoints > 1 ? (index / (totalPoints - 1)) * width : width / 2;
        const y = height - (value / maxVal) * height;
        return [x, y] as [number, number];
    };

    const lineAngleAndLength = (pointA: [number, number], pointB: [number, number]) => {
        const lengthX = pointB[0] - pointA[0];
        const lengthY = pointB[1] - pointA[1];
        return {
            length: Math.sqrt(lengthX ** 2 + lengthY ** 2),
            angle: Math.atan2(lengthY, lengthX)
        };
    };

    const controlPoint = (current: [number, number], previous: [number, number] | undefined, next: [number, number] | undefined, isEnd?: boolean) => {
        const p = previous || current;
        const n = next || current;
        const smoothing = 0.2;
        const o = lineAngleAndLength(p, n);
        const angle = o.angle + (isEnd ? Math.PI : 0);
        const length = o.length * smoothing;
        const x = current[0] + Math.cos(angle) * length;
        const y = current[1] + Math.sin(angle) * length;
        return [x, y];
    };
    
    const generateCurvePath = (data: number[]) => {
        if (data.length < 2) return '';
        const coords = data.map((d, i) => getCoords(d, i, data.length));
        const path = coords.reduce((acc, point, i, a) => {
            if (i === 0) return `M ${point[0]},${point[1]}`;
            const [cpsX, cpsY] = controlPoint(a[i - 1], a[i - 2], a[i]);
            const [cpeX, cpeY] = controlPoint(a[i], a[i - 1], a[i + 1], true);
            return `${acc} C ${cpsX},${cpsY} ${cpeX},${cpeY} ${point[0]},${point[1]}`;
        }, '');
        return path;
    };
    
    const getClientX = (event: React.MouseEvent) => {
        const rect = chartRef.current?.getBoundingClientRect();
        if (!rect) return 0;
        return event.clientX - rect.left - margin.left;
    };

    const handleMouseMove = useCallback((event: React.MouseEvent<SVGRectElement>) => {
        const clientX = getClientX(event);

        if (isDragging.current) {
            setDragRange(prev => ({ ...prev, end: clientX }));
            return;
        }
        
        const totalPoints = displayedData[0]?.points.length || 1;
        if (totalPoints <= 1) return;

        const index = Math.round((clientX / width) * (totalPoints - 1));
        if (index < 0 || index >= totalPoints) {
            setHoverData(null);
            return;
        }

        const seriesData = displayedData.map(series => {
            const value = series.points[index];
            const [, y] = getCoords(value, index, totalPoints);
            return { name: series.name, value, color: series.color, y };
        });

        const [x] = getCoords(seriesData[0].value, index, totalPoints);
        setHoverData({ index, x, series: seriesData });

    }, [displayedData, width, maxVal, height]);

    const handleMouseLeave = useCallback(() => {
        setHoverData(null);
        if (isDragging.current) {
            isDragging.current = false;
            setDragRange({ start: null, end: null });
        }
    }, []);

    const handleMouseDown = useCallback((event: React.MouseEvent<SVGRectElement>) => {
        isDragging.current = true;
        setDragRange({ start: getClientX(event), end: getClientX(event) });
    }, []);

    const handleMouseUp = useCallback(() => {
        if (isDragging.current && dragRange.start !== null && dragRange.end !== null) {
            const totalPointsInView = displayedData[0]?.points.length || 1;
            const startX = Math.min(dragRange.start, dragRange.end);
            const endX = Math.max(dragRange.start, dragRange.end);

            if (endX - startX > 10) { // Minimum drag width to trigger zoom
                const currentOffset = zoomRange?.start || 0;
                
                const startIndex = Math.floor((startX / width) * totalPointsInView) + currentOffset;
                const endIndex = Math.ceil((endX / width) * totalPointsInView) + currentOffset;

                if (endIndex > startIndex) {
                    setZoomRange({ start: startIndex, end: endIndex });
                }
            }
        }
        isDragging.current = false;
        setDragRange({ start: null, end: null });
    }, [dragRange, width, displayedData, zoomRange]);
    
    const handleResetZoom = () => {
        setZoomRange(null);
    }
    
    return (
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
             <div className="flex flex-col sm:flex-row justify-between items-center mb-8">
                <div>
                    <h2 className="text-xl font-bold text-gray-900">Platform Analytics</h2>
                    <p className="text-sm text-gray-500">Growth trends across key metrics. Drag on chart to zoom.</p>
                </div>
                <div className="flex items-center gap-2 mt-4 sm:mt-0">
                    {zoomRange && (
                        <button onClick={handleResetZoom} className="px-4 py-1.5 text-sm font-medium text-blue-600 bg-blue-100 rounded-md hover:bg-blue-200">Reset Zoom</button>
                    )}
                    <div className="flex bg-gray-100 p-1 rounded-lg">
                        {(['1W', '1M', '6M', '1Y'] as TimeFilter[]).map(f => (
                            <button
                                key={f}
                                onClick={() => { setFilter(f); setZoomRange(null); }}
                                className={`px-4 py-1.5 text-sm font-medium rounded-md transition-all ${
                                    filter === f 
                                        ? 'bg-white text-gray-900 shadow-sm' 
                                        : 'text-gray-500 hover:text-gray-700'
                                }`}
                            >
                                {f}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
            <div ref={chartContainerRef} className="relative w-full" style={{ height: `${SVG_HEIGHT}px` }}>
                <svg ref={chartRef} viewBox={`0 0 ${SVG_WIDTH} ${SVG_HEIGHT}`} className="w-full h-full overflow-visible">
                    <defs>
                        {displayedData.map(series => (
                             <React.Fragment key={series.name}>
                                <linearGradient id={`grad-${series.name.replace(/\s+/g, '')}`} x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="0%" stopColor={series.color} stopOpacity="0.2" />
                                    <stop offset="100%" stopColor={series.color} stopOpacity="0" />
                                </linearGradient>
                                <filter id={`shadow-${series.name.replace(/\s+/g, '')}`} x="-50%" y="-50%" width="200%" height="200%">
                                  <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor={series.color} floodOpacity="0.3" />
                                </filter>
                            </React.Fragment>
                        ))}
                    </defs>
                    <g transform={`translate(${margin.left},${margin.top})`}>
                        {/* Y-Axis Grid Lines & Labels */}
                        {[0, 0.25, 0.5, 0.75, 1].map(tick => (
                            <g key={tick} transform={`translate(0, ${height - tick * height})`}>
                                <line x1={-10} x2={width} stroke="#F3F4F6" strokeWidth="1" />
                                <text x={-15} dy="0.32em" textAnchor="end" className="text-xs text-gray-400 fill-current">
                                    {(maxVal * tick).toLocaleString(undefined, {notation: 'compact'})}
                                </text>
                            </g>
                        ))}

                        {/* Chart Lines and Areas */}
                        {displayedData.map(series => {
                             const path = generateCurvePath(series.points);
                             const areaPath = `${path} L ${width},${height} L 0,${height} Z`;
                             return (
                                <g key={series.name}>
                                    <path d={areaPath} fill={`url(#grad-${series.name.replace(/\s+/g, '')})`} />
                                    <path d={path} fill="none" stroke={series.color} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" filter={`url(#shadow-${series.name.replace(/\s+/g, '')})`} />
                                </g>
                             );
                        })}

                        {/* Hover Effects */}
                        {hoverData && (
                            <g>
                                <line x1={hoverData.x} y1="0" x2={hoverData.x} y2={height} stroke="#d1d5db" strokeWidth="1" strokeDasharray="4 4" />
                                {hoverData.series.map(s => (
                                    <circle key={s.name} cx={hoverData.x} cy={s.y} r="5" fill={s.color} stroke="white" strokeWidth="2" />
                                ))}
                            </g>
                        )}
                        
                        {/* Drag Selection for Zoom */}
                        {isDragging.current && dragRange.start !== null && dragRange.end !== null && (
                            <rect
                                x={Math.min(dragRange.start, dragRange.end)}
                                y="0"
                                width={Math.abs(dragRange.end - dragRange.start)}
                                height={height}
                                fill="rgba(59, 130, 246, 0.1)"
                                stroke="rgba(59, 130, 246, 0.3)"
                                strokeWidth="1"
                            />
                        )}

                        {/* Interaction Overlay */}
                        <rect 
                            width={width} 
                            height={height} 
                            fill="transparent"
                            style={{ cursor: 'crosshair' }}
                            onMouseMove={handleMouseMove}
                            onMouseLeave={handleMouseLeave}
                            onMouseDown={handleMouseDown}
                            onMouseUp={handleMouseUp}
                        />
                    </g>
                </svg>

                 {/* Tooltip */}
                {hoverData && chartContainerRef.current && (
                    <div
                        className="absolute bg-white p-3 rounded-lg shadow-xl border border-gray-200 pointer-events-none transition-transform duration-100"
                        style={{
                            left: `${margin.left + hoverData.x + 15}px`,
                            top: `${margin.top}px`,
                            transform: `translateX(${hoverData.x > width / 2 ? '-110%' : '0'})`,
                        }}
                    >
                        <p className="text-xs text-gray-500 font-semibold mb-2">Data Point {hoverData.index + (zoomRange?.start || 0) + 1}</p>
                        <div className="space-y-1">
                            {hoverData.series.map(s => (
                                <div key={s.name} className="flex justify-between items-center gap-4">
                                    <div className="flex items-center gap-2">
                                        <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: s.color }}></span>
                                        <span className="text-xs font-medium text-gray-600">{s.name}</span>
                                    </div>
                                    <span className="text-xs font-bold text-gray-800">{s.value.toLocaleString()}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>

             {/* Legend */}
            <div className="flex flex-wrap gap-x-6 gap-y-2 justify-center mt-6">
                {displayedData.map(series => (
                    <div key={series.name} className="flex items-center gap-2">
                        <span className="w-3 h-3 rounded-full" style={{ backgroundColor: series.color }}></span>
                        <span className="text-sm font-medium text-gray-600">{series.name}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};


const DashboardView: React.FC = () => {
    return (
        <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-8">Admin Overview</h1>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <StatCard label="Total Candidates" value={MOCK_ADMIN_STATS.totalCandidates} change="+12%" isPositive={true} />
                <StatCard label="Active Employers" value={MOCK_ADMIN_STATS.activeEmployers} change="+5%" isPositive={true} />
                <StatCard label="New Job Posts (30d)" value={MOCK_ADMIN_STATS.newJobPosts} change="-2%" isPositive={false} />
                <StatCard label="Pending Approvals" value={MOCK_ADMIN_STATS.pendingApprovals} />
            </div>

            <StatsAreaChart />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                    <h2 className="text-xl font-bold text-gray-900 mb-6">Recent Activity</h2>
                    <div className="space-y-4">
                        {[1, 2, 3].map((_, i) => (
                            <div key={i} className="flex items-start gap-4 p-3 hover:bg-gray-50 rounded-lg transition-colors">
                                <div className="w-2 h-2 mt-2 rounded-full bg-blue-500 flex-shrink-0"></div>
                                <div>
                                    <p className="text-sm font-medium text-gray-900">New Employer Registration</p>
                                    <p className="text-xs text-gray-500">BuildWell Construction just signed up.</p>
                                    <span className="text-xs text-gray-400 mt-1 block">2 hours ago</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                    <h2 className="text-xl font-bold text-gray-900 mb-6">System Status</h2>
                    <div className="space-y-4">
                        <div className="flex justify-between items-center">
                            <span className="text-sm font-medium text-gray-600">Server Uptime</span>
                            <span className="text-sm font-bold text-green-600">99.9%</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-sm font-medium text-gray-600">Database Load</span>
                            <span className="text-sm font-bold text-blue-600">Normal</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-sm font-medium text-gray-600">Pending Background Checks</span>
                            <span className="text-sm font-bold text-amber-600">12</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardView;

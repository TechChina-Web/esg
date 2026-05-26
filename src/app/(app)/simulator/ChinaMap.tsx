"use client";
import * as React from "react";
import ReactECharts from "echarts-for-react";
import * as echarts from "echarts/core";
import { MapChart } from "echarts/charts";
import { GeoComponent, TooltipComponent } from "echarts/components";
import { CanvasRenderer } from "echarts/renderers";

echarts.use([MapChart, GeoComponent, TooltipComponent, CanvasRenderer]);

export type ChinaMapProps = {
  isDark: boolean;
  onReady?: (instance: any) => void;
  onGeoChange?: () => void;
};

export default function ChinaMap({ isDark, onReady, onGeoChange }: ChinaMapProps) {
  const [mapLoaded, setMapLoaded] = React.useState(false);
  const chartRef = React.useRef<any>(null);

  React.useEffect(() => {
    fetch("https://geo.datav.aliyun.com/areas_v3/bound/100000_full.json")
      .then((r) => r.json())
      .then((geoJson) => {
        echarts.registerMap("china", geoJson);
        setMapLoaded(true);
      })
      .catch(() => {
        fetch("https://cdn.jsdelivr.net/npm/echarts/map/json/china.json")
          .then((r) => r.json())
          .then((geoJson) => {
            echarts.registerMap("china", geoJson);
            setMapLoaded(true);
          });
      });
  }, []);

  const areaColor = isDark ? "#0f1a2e" : "#ddeaf5";
  const borderColor = isDark ? "rgba(10,209,200,0.3)" : "rgba(10,209,200,0.55)";
  const emphasisColor = isDark ? "#132236" : "#c6ddef";

  const option = {
    backgroundColor: "transparent",
    geo: {
      map: "china",
      roam: true,
      // Focus on mainland — exclude South China Sea island chains
      boundingCoords: [
        [73, 53],   // [lon, lat] top-left
        [135, 18],  // bottom-right (stops above Hainan/Paracel)
      ],
      itemStyle: {
        areaColor,
        borderColor,
        borderWidth: 0.8,
        shadowColor: isDark ? "rgba(10,209,200,0.06)" : "transparent",
        shadowBlur: 6,
      },
      emphasis: {
        itemStyle: {
          areaColor: emphasisColor,
          borderColor: isDark ? "rgba(10,209,200,0.55)" : "rgba(10,209,200,0.75)",
          borderWidth: 1,
        },
        label: { show: false },
      },
      label: { show: false },
    },
    series: [],
  };

  const handleReady = (instance: any) => {
    chartRef.current = instance;
    // Fire onGeoChange on pan/zoom so parent can re-project coordinates
    instance.on("georoam", () => {
      onGeoChange?.();
    });
    onReady?.(instance);
  };

  if (!mapLoaded) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <span className="text-[11px] text-content-subtle animate-pulse">Loading map…</span>
      </div>
    );
  }

  return (
    <ReactECharts
      ref={chartRef}
      echarts={echarts}
      option={option}
      style={{ width: "100%", height: "100%" }}
      onChartReady={handleReady}
      opts={{ renderer: "canvas" }}
    />
  );
}

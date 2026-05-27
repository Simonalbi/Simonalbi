import { Component, inject, OnInit } from '@angular/core';
import { DashboardCardComponent } from "../dashboard-card/dashboard-card.component";

import { NgxEchartsModule, NGX_ECHARTS_CONFIG} from 'ngx-echarts';
import { EChartsOption } from 'echarts';
import * as echarts from 'echarts/core';
import { BarChart, ScatterChart } from 'echarts/charts';
import { GridComponent } from 'echarts/components';
import { CanvasRenderer } from 'echarts/renderers';
import { SkillsService } from '../../services/skills.service';

echarts.use([BarChart, GridComponent, CanvasRenderer, ScatterChart]);

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [DashboardCardComponent, NgxEchartsModule],
  templateUrl: './skills.component.html',
  styleUrl: './skills.component.css',
  providers: [
    {
      provide: NGX_ECHARTS_CONFIG,
      useFactory: () => ({ echarts })
    }
  ]
})
export class SkillsComponent implements OnInit{
  private skillsService = inject(SkillsService);

  private labels = [
    'Beginner',
    'Novice',
    'Basic',
    'Fair',
    'Intermediate',
    'Good',
    'Very Good',
    'Advanced',
    'Expert',
    'Professional'
  ];

  chartOptions: EChartsOption = {};

  async ngOnInit(): Promise<void> {
    const skills = this.skillsService.skillsList.reverse();

    const screenWidth  = window.innerWidth;
    let symbolSize: number;
    if (screenWidth >= 1200) {
      symbolSize = 32;
    } else if (screenWidth >= 768) {
      symbolSize = 24;
    } else {
      symbolSize = 16;
    }

    const barWidth = symbolSize / 3;

    var labelsRotation: number = 0;
    if (screenWidth < 780) {
      labelsRotation = -60;
    }

    const data = await Promise.all(
      skills.map(async skill => {
        const color = await this.getDominantColorFromImageUrl(skill.image);
        
        const r = color[0];
        const g = color[1];
        const b = color[2];

        // Soft lighter color for the top edge
        const rL = Math.min(255, r + 40);
        const gL = Math.min(255, g + 40);
        const bL = Math.min(255, b + 40);

        // Slightly deeper color for the bottom edge
        const rD = Math.max(0, r - 20);
        const gD = Math.max(0, g - 20);
        const bD = Math.max(0, b - 20);

        return {
          value: skill.level - 1,
          itemStyle: {
            color: {
              type: 'linear' as const,
              x: 0,
              y: 0,
              x2: 0,
              y2: 1, // Vertical gradient
              colorStops: [
                { offset: 0, color: `rgb(${rL}, ${gL}, ${bL})` }, // Soft light top
                { offset: 1, color: `rgb(${rD}, ${gD}, ${bD})` }  // Solid deeper base
              ]
            }
          }
        };
      })
    );

    this.chartOptions = {
      animationDuration: 1500,
      animationEasing: 'cubicOut',
      grid: {
        left: '1%',
        right: '10%',
        top: '5%',
        bottom: '1%',
        containLabel: true
      },
      xAxis: {
        type: 'value',
        min: 0,
        max: 9,
        splitNumber: 10,
        splitLine: {
          lineStyle: {
            color: '#50575E',
            type: 'dashed',
            opacity: 0.1
          }
        },
        axisLabel: {
          formatter: (value: number) =>this.labels[value] ?? '',
          rich: {
            top: {
              padding: [0, 0, 16, 0],
              verticalAlign: 'bottom'
            },
            bottom: {
              padding: [16, 0, 0, 0],
              verticalAlign: 'top'
            }
          },
          fontSize: 10,
          rotate: labelsRotation
        },
        axisLine: { show: false },
        axisTick: { show: false }
      },
      yAxis: {
        type: 'category',
        data: skills.map(skill => skill.name),
        axisLine: { show: false },
        axisTick: { show: false },
        axisLabel: {
          interval: 0,
          margin: 10,
          fontSize: 12,
          fontWeight: 'bold'
        }
      },
      series: [
        {
          type: 'bar',
          data: data,
          barWidth: barWidth,
          itemStyle: {
            borderRadius: 12,
            shadowColor: 'rgba(0, 0, 0, 0.08)',
            shadowBlur: 4,
            shadowOffsetY: 2
          }
        },
        {
          type: 'scatter',
          data: skills.map(skill => ({
            value: skill.level - 1,
            symbol: `image://${skill.image}`,
            symbolSize: symbolSize
          })),
          symbolOffset: [symbolSize * 0.75, 0],
          xAxisIndex: 0,
          yAxisIndex: 0,
          z: 10
        }
      ]
    };
  }

  async getDominantColorFromImageUrl(url: string): Promise<[number, number, number]> {
    return new Promise(async (resolve) => {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.src = url;

      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;

        const ctx = canvas.getContext('2d');
        if (!ctx) {
          resolve([0, 0, 0]);
          return;
        }

        ctx.drawImage(img, 0, 0);
        const data = ctx.getImageData(0, 0, canvas.width, canvas.height).data;

        const colorMap: Record<string, number> = {};
        let mostFrequent = { color: '', count: 0 };

        for (let i = 0; i < data.length; i += 4) {
          const alpha = data[i + 3];
          if (alpha === 0) continue;

          const rgb = `${data[i]},${data[i + 1]},${data[i + 2]}`;
          colorMap[rgb] = (colorMap[rgb] || 0) + 1;

          if (colorMap[rgb] > mostFrequent.count) {
            mostFrequent = { color: rgb, count: colorMap[rgb] };
          }
        }

        const [r, g, b] = mostFrequent.color.split(',').map(Number);
        resolve([r, g, b]);
      };

      img.onerror = () => {
        console.error('Errore caricamento immagine');
        resolve([0, 0, 0]);
      };
    });
  }
}
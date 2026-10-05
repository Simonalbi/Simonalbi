import { Component, HostListener, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardCardComponent } from "../dashboard-card/dashboard-card.component";

import { NgxEchartsModule, NGX_ECHARTS_CONFIG } from 'ngx-echarts';
import { EChartsOption } from 'echarts';
import * as echarts from 'echarts/core';
import { BarChart, ScatterChart } from 'echarts/charts';
import { GridComponent, MarkAreaComponent, MarkLineComponent } from 'echarts/components';
import { CanvasRenderer } from 'echarts/renderers';
import { SkillsService } from '../../services/skills.service';
import { Skill } from '../../models/skill.model';

echarts.use([BarChart, GridComponent, CanvasRenderer, ScatterChart, MarkAreaComponent, MarkLineComponent]);

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [CommonModule, DashboardCardComponent, NgxEchartsModule],
  templateUrl: './skills.component.html',
  styleUrl: './skills.component.css',
  providers: [
    {
      provide: NGX_ECHARTS_CONFIG,
      useFactory: () => ({ echarts })
    }
  ]
})
export class SkillsComponent implements OnInit {
  private skillsService = inject(SkillsService);

  readonly categories = ['All', 'Frontend', 'Backend', 'Database', 'DevOps', 'Testing', 'Mobile'];
  selectedCategory = 'All';

  // Category order from bottom to top on horizontal bar chart (so Frontend appears at top)
  private readonly categoryOrderBottomToTop = ['Mobile', 'Testing', 'DevOps', 'Database', 'Backend', 'Frontend'];

  private readonly categoryColors: Record<string, string> = {
    'Frontend': 'rgba(148, 57, 194, 0.05)',
    'Backend': 'rgba(59, 130, 246, 0.05)',
    'Database': 'rgba(245, 158, 11, 0.05)',
    'DevOps': 'rgba(16, 185, 129, 0.05)',
    'Testing': 'rgba(244, 63, 94, 0.05)',
    'Mobile': 'rgba(99, 102, 241, 0.05)'
  };

  private readonly labels = [
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
  chartHeight = '620px';

  private colorCache = new Map<string, [number, number, number]>();

  async ngOnInit(): Promise<void> {
    await this.renderChart();
  }

  @HostListener('window:resize')
  onResize(): void {
    this.renderChart();
  }

  getCategoryCount(cat: string): number {
    if (cat === 'All') {
      return this.skillsService.skillsList.length;
    }
    return this.skillsService.skillsList.filter(s => s.category === cat).length;
  }

  async selectCategory(cat: string): Promise<void> {
    if (this.selectedCategory === cat) return;
    this.selectedCategory = cat;
    await this.renderChart();
  }

  private async renderChart(): Promise<void> {
    // Filter and group skills
    let filtered: Skill[];
    if (this.selectedCategory === 'All') {
      filtered = [];
      for (const cat of this.categoryOrderBottomToTop) {
        const catSkills = this.skillsService.skillsList
          .filter(s => s.category === cat)
          .sort((a, b) => a.level - b.level);
        filtered.push(...catSkills);
      }
    } else {
      filtered = this.skillsService.skillsList
        .filter(s => s.category === this.selectedCategory)
        .sort((a, b) => a.level - b.level);
    }

    const screenWidth = typeof window !== 'undefined' ? window.innerWidth : 1280;
    const isMobile = screenWidth < 780;

    let symbolSize: number;
    if (screenWidth >= 1200) {
      symbolSize = 22;
    } else if (screenWidth >= 768) {
      symbolSize = 20;
    } else {
      symbolSize = 16;
    }

    const barWidth = Math.max(8, symbolSize / 3);
    const labelsRotation = isMobile ? -60 : 0;

    // Adjust chart height dynamically based on count and spacers
    if (this.selectedCategory === 'All') {
      this.chartHeight = isMobile ? '760px' : '820px';
    } else {
      this.chartHeight = `${Math.max(240, filtered.length * (isMobile ? 48 : 52) + (isMobile ? 90 : 70))}px`;
    }

    // Map dominant colors for all skills
    const skillBarDataMap = new Map<string, any>();
    await Promise.all(
      filtered.map(async (skill) => {
        const color = await this.getDominantColor(skill.image);
        const [r, g, b] = color;
        const rL = Math.min(255, r + 40);
        const gL = Math.min(255, g + 40);
        const bL = Math.min(255, b + 40);
        const rD = Math.max(0, r - 20);
        const gD = Math.max(0, g - 20);
        const bD = Math.max(0, b - 20);

        skillBarDataMap.set(skill.name, {
          value: skill.level - 1,
          itemStyle: {
            color: {
              type: 'linear' as const,
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [
                { offset: 0, color: `rgb(${rL}, ${gL}, ${bL})` },
                { offset: 1, color: `rgb(${rD}, ${gD}, ${bD})` }
              ]
            }
          }
        });
      })
    );

    // Group items by category to find start/end skill names
    const catGroups: { cat: string; skills: Skill[] }[] = [];
    let currentCat = '';
    let currentGroup: Skill[] = [];

    for (const skill of filtered) {
      if (skill.category !== currentCat) {
        if (currentGroup.length > 0) {
          catGroups.push({ cat: currentCat, skills: currentGroup });
        }
        currentCat = skill.category;
        currentGroup = [skill];
      } else {
        currentGroup.push(skill);
      }
    }
    if (currentGroup.length > 0) {
      catGroups.push({ cat: currentCat, skills: currentGroup });
    }

    // Build final data with spacers between categories for clean visual separation
    const finalYAxisData: string[] = [];
    const finalBarData: any[] = [];
    const finalScatterData: any[] = [];
    const markAreaData: any[] = [];
    const markLineData: any[] = [];

    let spacerIndex = 0;
    catGroups.forEach((group, idx) => {
      const firstSkill = group.skills[0].name;
      const lastSkill = group.skills[group.skills.length - 1].name;

      markAreaData.push([
        {
          name: group.cat.toUpperCase(),
          yAxis: firstSkill,
          itemStyle: {
            color: this.categoryColors[group.cat] || 'rgba(148, 163, 184, 0.04)'
          },
          label: {
            position: 'insideRight',
            distance: isMobile ? 6 : 12,
            color: '#64748B',
            fontSize: isMobile ? 8 : 11,
            fontWeight: 700,
            letterSpacing: isMobile ? 1 : 2
          }
        },
        {
          yAxis: lastSkill
        }
      ]);

      // Add skills belonging to this category
      group.skills.forEach((skill) => {
        finalYAxisData.push(skill.name);
        finalBarData.push(skillBarDataMap.get(skill.name));
        finalScatterData.push({
          value: skill.level - 1,
          symbol: `image://${skill.image}`,
          symbolSize: symbolSize
        });
      });

      // Insert spacer and divider line between categories (only in multi-category view)
      if (idx < catGroups.length - 1) {
        const spacerName = `__spacer_${spacerIndex++}`;
        finalYAxisData.push(spacerName);
        finalBarData.push(null);
        finalScatterData.push(null);

        const bottomCat = group.cat;
        const topCat = catGroups[idx + 1].cat;
        const bottomColor = this.categoryColors[bottomCat] || 'rgba(148, 163, 184, 0.04)';
        const topColor = this.categoryColors[topCat] || 'rgba(148, 163, 184, 0.04)';

        // Color the spacer with a sharp split gradient:
        // Upper half (towards topCat) has the color of the section above,
        // Lower half (towards bottomCat) has the color of the section below,
        // meeting seamlessly right at the divider line with no white gap.
        markAreaData.push([
          {
            yAxis: spacerName,
            itemStyle: {
              color: {
                type: 'linear' as const,
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  { offset: 0, color: topColor },
                  { offset: 0.5, color: topColor },
                  { offset: 0.5, color: bottomColor },
                  { offset: 1, color: bottomColor }
                ]
              }
            }
          },
          {
            yAxis: spacerName
          }
        ]);

        markLineData.push({
          yAxis: spacerName,
          lineStyle: {
            color: '#E2E8F0',
            type: 'solid',
            width: 1
          },
          label: { show: false }
        });
      }
    });

    // Right margin: on desktop, 'Professional' is horizontal and extends ~34px to the right of tick 9;
    // on mobile with rotate: -60, 'Professional' slants downwards-right and extends ~30px to the right of tick 9.
    // In both cases, right: 36px ensures that the rightmost edge of 'Professional' ends at container width - 6px,
    // perfectly matching left: 6px symmetrically without getting clipped.
    const rightMargin = 36;
    const leftMargin = 6;

    this.chartOptions = {
      animationDuration: 800,
      animationEasing: 'cubicOut',
      grid: {
        left: leftMargin,
        right: rightMargin,
        top: '3%',
        bottom: isMobile ? 24 : 16,
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
            opacity: 0.12
          }
        },
        axisLabel: {
          formatter: (value: number) => this.labels[value] ?? '',
          fontSize: isMobile ? 9 : 10,
          rotate: labelsRotation,
          margin: 12
        },
        axisLine: { show: false },
        axisTick: { show: false }
      },
      yAxis: {
        type: 'category',
        data: finalYAxisData,
        axisLine: { show: false },
        axisTick: { show: false },
        axisLabel: {
          interval: 0,
          margin: isMobile ? 6 : 10,
          fontSize: isMobile ? 11 : 12,
          fontWeight: 'bold',
          color: '#0F172A',
          formatter: (value: string) => value.startsWith('__spacer_') ? '' : value
        }
      },
      series: [
        {
          type: 'bar',
          data: finalBarData,
          barWidth: barWidth,
          itemStyle: {
            borderRadius: 12,
            shadowColor: 'rgba(0, 0, 0, 0.08)',
            shadowBlur: 4,
            shadowOffsetY: 2
          },
          markArea: {
            silent: true,
            data: markAreaData
          },
          markLine: {
            silent: true,
            symbol: ['none', 'none'],
            data: markLineData
          }
        },
        {
          type: 'scatter',
          data: finalScatterData,
          symbolOffset: [symbolSize * 0.75, 0],
          xAxisIndex: 0,
          yAxisIndex: 0,
          z: 10
        }
      ]
    };
  }

  private async getDominantColor(url: string): Promise<[number, number, number]> {
    if (this.colorCache.has(url)) {
      return this.colorCache.get(url)!;
    }

    return new Promise((resolve) => {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.src = url;

      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          resolve([100, 100, 100]);
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

        const result: [number, number, number] = mostFrequent.color
          ? mostFrequent.color.split(',').map(Number) as [number, number, number]
          : [100, 100, 100];

        this.colorCache.set(url, result);
        resolve(result);
      };

      img.onerror = () => {
        const fallback: [number, number, number] = [100, 100, 100];
        this.colorCache.set(url, fallback);
        resolve(fallback);
      };
    });
  }
}
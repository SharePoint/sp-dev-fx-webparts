export interface IAreaChartDemoProps {
}

export interface IAreaChartDemoState {
  dataSet: number[];
  fill: false| 'origin' | 'start' | 'end';
  smooth: boolean;
}

import { memo, VFC } from 'react'
import { PieChart, Pie, Cell, Text, ResponsiveContainer, Label, Legend } from 'recharts'

type Props = {
  currentValue: number,
  targetValue: number
  unit: string
}

type Arg = {
  value: number,
  fill: string,
  x: number,
  y: number,
  cx: number,
  percent: number
}

export const Chart: VFC<Props> = memo((props) => {
  const { currentValue, targetValue, unit } = props

  const data = [
    {
      name: `現在の値`,
      value: currentValue
    },
    {
      name: `残りの値`,
      value: targetValue > 0 ? targetValue : 0
    }
  ]

  const percent = data[0].value / (data[0].value + data[1].value) * 100

  const colors = [
    '#FC8181',
    '#c9c9c9'
  ]

  const label = ({ value, fill, x, y, cx }: Arg) => {
    const textAnchor = x > cx ? 'start' : 'end'

    return (
      <>
      {
        fill === '#FC8181' ? 
        (
          <Text x={x} y={y} fill={ fill } textAnchor={ textAnchor }>
          { `${ value } ${ unit }` }
          </Text>
        ) :
        (
          <Text x={x} y={y} fill={ fill } textAnchor={ textAnchor }>
            { `${ value } ${ unit }` }
          </Text>
        )
      }
      </>
    )
  }

  return (
    <div style={{ width: '100%', height: '300px' }}>
      <ResponsiveContainer>
        <PieChart width={400} height={280} style={{ margin: 'auto' }}>
          <Legend layout='horizontal' verticalAlign='bottom' align='center' />
          <Pie
            data={ data }
            dataKey='value'
            cx='50%'
            cy='50%'
            innerRadius={30}
            outerRadius={80}
            label={ label }
            startAngle={90}
            endAngle={-270}
          >
            { data.map((item, index) => (
              <Cell key={ index } fill={ colors[index] } />
              )) }
            <Label
              value={ `${ (percent).toFixed(0) } %` }
              position='center'
              fill='grey'
              style={{
                fontWeight: 'bold'
              }}
            />
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
})

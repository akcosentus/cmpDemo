'use client'

import { LineChart, Line, PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

interface ChartRendererProps {
  type: 'line' | 'pie' | 'bar'
  data: any[]
  config?: {
    xKey?: string
    yKeys?: string[]
    nameKey?: string
    valueKey?: string
    colors?: string[]
    title?: string
  }
}

const DEFAULT_COLORS = ['#01B2D6', '#5cb85c', '#e91e8c', '#f39c12', '#9b59b6', '#34495e']

export default function ChartRenderer({ type, data, config = {} }: ChartRendererProps) {
  const colors = config.colors || DEFAULT_COLORS

  if (type === 'line') {
    return (
      <div className="my-6">
        {config.title && <h4 className="text-sm font-semibold mb-3 text-gray-700">{config.title}</h4>}
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey={config.xKey || 'name'} stroke="#6b7280" fontSize={12} />
            <YAxis stroke="#6b7280" fontSize={12} />
            <Tooltip 
              contentStyle={{ backgroundColor: '#fff', border: '1px solid #d1d5db', borderRadius: '6px' }}
              labelStyle={{ color: '#374151', fontWeight: 600 }}
            />
            <Legend wrapperStyle={{ fontSize: '12px' }} />
            {config.yKeys?.map((key, index) => (
              <Line 
                key={key}
                type="monotone" 
                dataKey={key} 
                stroke={colors[index % colors.length]} 
                strokeWidth={2}
                dot={{ fill: colors[index % colors.length], r: 4 }}
                activeDot={{ r: 6 }}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>
    )
  }

  if (type === 'pie') {
    return (
      <div className="my-6">
        {config.title && <h4 className="text-sm font-semibold mb-3 text-gray-700">{config.title}</h4>}
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={data}
              dataKey={config.valueKey || 'value'}
              nameKey={config.nameKey || 'name'}
              cx="50%"
              cy="50%"
              outerRadius={100}
              label={({ name, percent }) => `${name}: ${((percent || 0) * 100).toFixed(0)}%`}
              labelLine={{ stroke: '#6b7280' }}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
              ))}
            </Pie>
            <Tooltip 
              contentStyle={{ backgroundColor: '#fff', border: '1px solid #d1d5db', borderRadius: '6px' }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    )
  }

  if (type === 'bar') {
    return (
      <div className="my-6">
        {config.title && <h4 className="text-sm font-semibold mb-3 text-gray-700">{config.title}</h4>}
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey={config.xKey || 'name'} stroke="#6b7280" fontSize={12} />
            <YAxis stroke="#6b7280" fontSize={12} />
            <Tooltip 
              contentStyle={{ backgroundColor: '#fff', border: '1px solid #d1d5db', borderRadius: '6px' }}
              labelStyle={{ color: '#374151', fontWeight: 600 }}
            />
            <Legend wrapperStyle={{ fontSize: '12px' }} />
            {config.yKeys?.map((key, index) => (
              <Bar 
                key={key}
                dataKey={key} 
                fill={colors[index % colors.length]}
              />
            ))}
          </BarChart>
        </ResponsiveContainer>
      </div>
    )
  }

  return null
}

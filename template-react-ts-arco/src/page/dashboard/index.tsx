import React from 'react'
import { Card, Statistic, StatisticProps, Grid } from '@arco-design/web-react'
import './index.less'

const Row = Grid.Row
const Col = Grid.Col

const TopStatistic = (props: StatisticProps) => {
    return <Col span={8}>
        <Card hoverable className="custom-card-hover">
            <Statistic
                title={props.title}
                value={props.value}
                precision={props.precision}
                countUp
                // styleValue={props.styleValue}
            />
        </Card>
    </Col>
}

export default function Dashboard() {




    return (
        <div className='dashboard'>
        <Row gutter={20}>
            <TopStatistic title='User Growth Rate'
                value={50.32}
                precision={2} />
            <TopStatistic
                title='User Growth Rate'
                value={50.32}
                precision={2}
                countUp
                styleValue={{ color: '#0fbf60' }}
            />
            <TopStatistic
                title='User Growth Rate'
                value={50.32}
                precision={2}
                countUp
                styleValue={{ color: '#0fbf60' }}
            />
        </Row>
        </div>

    )
}

import React, { useState, useCallback } from 'react';
import classnames from 'classnames';

import useMedia from '../../../src/custom_hooks/useMedia';
import { Tabs, Tab } from '../tabs/Tabs';
import { DataProps } from './Dashboard';
import BarChart from '../charts/BarChart';
import Table from '../table/Table';
import Row from '../table/Row';
import Col from '../table/Col';

import './Individual.scss';

interface Props {
  data: DataProps[];
}

const MEDIA_QUERY_LIST = ['(max-width: 767px)', '(min-width: 768px)'];
const SCREEN_SIZES = ['s', 'm'];

const getLevel = (value: number, type: string): string => {
  switch (type) {
    case 'percentage':
    case 'number':
      return value < 0 ? 'error' : 'info';
    default:
      return 'info';
  }
};

const Individual: React.FC<Props> = ({ data }) => {
  const [selectedTab, setSelectedTab] = useState('chart');
  const screenSize = useMedia(MEDIA_QUERY_LIST, SCREEN_SIZES);
  const [selectedId, setSelectedId] = useState(data[0].id);
  const rowClickHandler = useCallback((id) => setSelectedId(id), []);

  return (
    <div className="individual">
      <Tabs hide={screenSize !== 's'} selectedValue={selectedTab}>
        <Tab onSelect={() => setSelectedTab('chart')} value="chart"></Tab>
        <Tab onSelect={() => setSelectedTab('table')} value="table"></Tab>
      </Tabs>
      <>
        <div
          className={classnames('chart', {
            hide: screenSize === 's' && selectedTab !== 'chart',
          })}
        >
          <BarChart data={data} />
        </div>
        <div
          className={classnames('tableContainer', {
            hide: screenSize === 's' && selectedTab !== 'table',
          })}
        >
          <Table>
            {data.map((datum) => (
              <Row
                key={`${datum.id}-${datum.label}`}
                level={getLevel(datum.value, datum.type)}
                selected={datum.id === selectedId}
                id={datum.id}
                onClickHandler={rowClickHandler}
              >
                {Object.keys(datum).map((key, index) => (
                  <React.Fragment key={`${datum[key]}-${index}`}>
                    {key !== 'type' && (
                      <Col
                        value={datum[key as keyof DataProps]}
                        isPercentage={
                          key === 'value' && datum.type === 'percentage'
                        }
                        numCols={key === 'description' ? 3 : 1}
                        center={key === 'value'}
                      />
                    )}
                  </React.Fragment>
                ))}
              </Row>
            ))}
          </Table>
        </div>
      </>
    </div>
  );
};

export default Individual;

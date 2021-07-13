import classNames from 'classnames';
import React, { Children } from 'react';

import './Tabs.scss';

export const Tabs: React.FC<{ hide: boolean; selectedValue: string }> = ({
  children,
  hide,
  selectedValue,
}) => {
  if (hide) {
    return null;
  }
  return (
    <div className="tabs">
      {Children.map(children, (Child) => {
        if (React.isValidElement(Child)) {
          const mergedProps = {
            ...Child.props,
            active: selectedValue === Child.props.value,
          };
          return React.cloneElement(Child, mergedProps);
        }
        return Child;
      })}
    </div>
  );
};

export const Tab = ({
  value,
  onSelect,
  active,
}: {
  value: string;
  onSelect: (value: string) => void;
  active?: boolean;
}): JSX.Element => {
  const onClickHandler = (event) => onSelect(event.target.value);

  return (
    <span
      className={classNames('tab', { active: active })}
      onClick={onClickHandler}
    >
      {value}
    </span>
  );
};

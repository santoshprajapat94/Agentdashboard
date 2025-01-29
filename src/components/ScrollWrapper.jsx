import React from 'react';
import ScrollBar from 'react-perfect-scrollbar';

export function ScrollWrapper({ children, style, className }) {
  return (
    <ScrollBar className={className} style={style} options={{ wheelPropagation: false, suppressScrollX: true }}>
      {children}
    </ScrollBar>
  );
}

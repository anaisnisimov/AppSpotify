import {styleDatas}  from './styleDatas';

export const styleFilter = () => {
    const styleDatasArray = styleDatas.map(styleData => styleData.value);
    let styles = [];
    styleSpotify.map(style => {
      if (styleDatasArray.includes(style)) {
        styles = [...styles, style];
      }
      return null;
    });
    return styles.length > 0 ? styles[0] : "other";
  };
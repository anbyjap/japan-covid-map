import { useD3 } from "./hooks/useD3";
import React from "react";
import * as d3 from "d3";

// GeoJsonファイルを読み込み
import geoJson from "./data/japan.geo.json";

import {getCovidNum}  from "./getCovidNum";

const PlotJapan = () => {

  const ref = useD3(
    (svg) => {

        const width = 400; // 描画サイズ: 幅
        const height = 400; // 描画サイズ: 高さ
        const centerPos = [130.0, 42]; // 地図のセンター位置
        const scale = 1500; // 地図のスケール
    
        // 地図の投影設定
        const projection = d3
        .geoMercator()
        .center(centerPos)
        .translate([width / 2, height / 2])
        .scale(scale);
    
        // 地図をpathに投影(変換)
        const path = d3.geoPath().projection(projection);
    
        // SVG要素を追加
        svg
        .select(`#map-container`)
        .attr(`viewBox`, `0 0 ${width} ${height}`)
        .attr(`width`, `100%`)
        .attr(`height`, `100%`);
    
        // 
        // [ メモ ]
        // 動的にGeoJsonファイルを読み込む場合は以下のコードを使用
        // const geoJson = await d3.json(`/japan.geo.json`);
        // 
        // 都道府県の領域データをpathで描画
        svg
        .selectAll(`path`)
        .data(geoJson.features)
        .enter()
        .append(`path`)
        .attr(`d`, path)
        .attr(`stroke`, `#666`)
        .attr(`stroke-width`, 0.25)
        .attr(`fill`, `#2566CC`)
        .attr(`fill-opacity`, (item) => {
          // メモ
          // item.properties.name_ja に都道府県名が入っている
          if((parseInt(item.properties.provnum_ne))%2===0) return 0;
          else return 1;
          // 透明度をランダムに指定する (0.0 - 1.0)
          //return Math.random();
        })
    
        /**c
         * 都道府県領域の MouseOver イベントハンドラ
         */
        .on(`mouseover`, function(item) {
      const covidData = require("./data/covids.json");

          // ラベル用のグループ
        const group = svg.append(`g`).attr(`id`, `label-group`);
          // 地図データから都道府県名を取得する
        const label = item.properties.name_ja;
        
        ///////////////////////////   print the total number of covid cases when mouse overed   /////////////////////////////////
        console.log(covidData);
        const totalCovidNum = getCovidNum(label,covidData);
        /////////////////////////////////////////////////////////////////////////////////////////////////////////
        // 矩形を追加: テキストの枠
        const rectElement = group
            .append(`rect`)
            .attr(`id`, `label-rect`)
            .attr(`stroke`, `#666`)
            .attr(`stroke-width`, 0.5)
            .attr(`fill`, `#fff`);
    
          // テキストを追加
        const textElement = group
            .append(`text`)
            .attr(`id`, `label-text`)
            .text( label + ' : ' + totalCovidNum + "人")
    
          // テキストのサイズから矩形のサイズを調整
        const padding = { x: 5, y: 0 };
        const textSize = textElement.node().getBBox();
        rectElement
            .attr(`x`, textSize.x - padding.x)
            .attr(`y`, textSize.y - padding.y)
            .attr(`width`, textSize.width + padding.x * 5)
            .attr(`height`, textSize.height + padding.y * 5);
    
          // マウス位置の都道府県領域を赤色に変更
        d3.select(this).attr(`fill`, `#CC4C39`);
        d3.select(this).attr(`stroke-width`, `1`);
        })
    
        /**
         * 都道府県領域の MouseMove イベントハンドラ
         */
        .on("mousemove", function(item) {
          // テキストのサイズ情報を取得
        const textSize = svg
            .select("#label-text")
            .node()
            .getBBox();
    
          // マウス位置からラベルの位置を指定
        const labelPos = {
            x: d3.event.offsetX - textSize.width,
            y: d3.event.offsetY - textSize.height
        };
    
          // ラベルの位置を移動
        svg
            .select("#label-group")
            .attr(`transform`, `translate(${labelPos.x}, ${labelPos.y})`);
        })
    
        /**
         * 都道府県領域の MouseOut イベントハンドラ
         */
        .on(`mouseout`, function(item) {
          // ラベルグループを削除
        svg.select("#label-group").remove();
          // マウス位置の都道府県領域を青色に戻す
        d3.select(this).attr(`fill`, `#2566CC`);
        d3.select(this).attr(`stroke-width`, `0.25`);
        }
      );
    }, 
  );

  return(
    <svg
      ref={ref}
      style={{
        height: "80vh",
        width: "100%",
        marginRight: "0px",
        marginLeft: "0px",
    }}
    >
    </svg>
  )
}

export default PlotJapan;

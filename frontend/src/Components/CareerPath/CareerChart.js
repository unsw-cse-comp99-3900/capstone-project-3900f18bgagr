import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { sankey, sankeyLinkHorizontal, sankeyJustify } from 'd3-sankey';
import { Box, Typography, Button, Grid } from "@mui/material";

const handleSaveDiagram = () => {
    alert('Diagram Saved')
}
const SankeyChart = ({ data }) => {
    const svgRef = useRef();

    useEffect(() => {
      if (!data || !data.nodes || !data.links) {
          console.error('Sankey data is missing or incorrect');
          return;
      }

      const svg = d3.select(svgRef.current);
      svg.selectAll("*").remove();

      const color = d3.scaleOrdinal()
                      .domain(data.nodes.map(d => d.name))
                      .range(d3.schemeTableau10.concat(d3.schemeSet3));  // 扩展颜色范围


      const { nodes, links } = data;
      svg.selectAll("*").remove(); // Clear SVG before redraw

      const width = 960;
      const height = 800;

      // Setup Sankey generator
      const sankeyGenerator = sankey()
          .nodeWidth(10)
          .nodePadding(20)
          .size([width, height])
          .nodeAlign(sankeyJustify);

      const { nodes: graphNodes, links: graphLinks } = sankeyGenerator({
          nodes: nodes.map(d => ({ ...d })),
          links: links.map(d => ({ ...d }))
      });

      // Draw links
      svg.append("g")
          .selectAll("path")
          .data(graphLinks)
          .join("path")
          .attr("d", sankeyLinkHorizontal())
          .attr("stroke", d => color(d.source.name))
          .attr("stroke-width", d => Math.max(1, d.width))
          .attr("stroke-opacity", 0.5)
          .style("fill", "none")
          .append("title")
          .text(d => `${d.source.name} → ${d.target.name}\n${d.value}`);

      // Draw nodes
      svg.append("g")
          .selectAll("rect")
          .data(graphNodes)
          .join("rect")
          .attr("x", d => d.x0)
          .attr("y", d => d.y0)
          .attr("height", d => d.y1 - d.y0)
          .attr("width", sankeyGenerator.nodeWidth())
          .attr("fill", d => color(d.name))
          .append("title")
          .text(d => `${d.name}\n${d.value}\n${d.skillsTicked}\n${d.skillsNotMet}`);

      // Add labels
      svg.append("g")
          .attr("font-family", "sans-serif")
          .attr("font-size", 10)
          .selectAll("text")
          .data(graphNodes)
          .join("text")
          .attr("x", d => d.x0 < width / 2 ? d.x1 + 6 : d.x0 - 6)
          .attr("y", d => (d.y1 + d.y0) / 2)
          .attr("dy", "0.35em")
          .attr("text-anchor", d => d.x0 < width / 2 ? "start" : "end")
          .text(d => d.name);

    }, [data]);

    return (
        <div style={{width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column'}}>
            <svg ref={svgRef} width={1260} height={900} style={{margin: "20px" }} />;
            {/*<Button style={{backgroundColor: '#460f9f'}} variant="contained" color="primary" onClick={handleSaveDiagram}>*/}
            {/*  <Typography variant="button">Save Diagram</Typography>*/}
            {/*</Button>*/}
        </div>
    )
};

export default SankeyChart;

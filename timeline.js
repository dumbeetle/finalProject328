$(document).ready(function(){
    $("#top50Timeline").click(function () {
        displayTopTimeline();
    });
    $("#displayFullTimeline").click(function () {
        displayFullTimeline();
    });
});

//global sizes
// changed selectors -clinton
var chartYears = d3.select('#chartYears');
var margin = {top: 200, right: 200, bottom: 200, left: 200};
// shrank your global margins -clinton
var h = 800 - margin.top - margin.bottom;
var w = 900 - margin.left - margin.right;
// resized chart height/width so all graphs are same size - clinton
//Colors for the years
var COLORS = ["#7fc97c", "#beaed4", "#fdc086", "#ffff99", "#386cb0", "#f0027f"];


function displayFullTimeline() {
    d3.csv('VGDATAclean.csv', function(data) {
        //remove previous SVG element
        d3.selectAll('svg').remove();

        //size variables
        var w = (data.length *3) + 6
        var BAR_WIDTH = 2
        var maxSales = 0;
            for (var i=0; i<data.length; i++){
                maxSales = Math.max(maxSales, data[i].Global_Sales)
            }
        //sort data by year
        var years = data.sort(function(x,y) {
            return d3.ascending(x.Year_of_Release, y.Year_of_Release)
        })

        //create scales based on data
        var xScale = d3.scale.linear()
            .domain(d3.extent(data, function(d) {
                return d.Year_of_Release
            }))
            .range([0,w]);
        var yScale = d3.scale.linear()
            .domain([
                d3.max([0,d3.max(data, function(d) { return d.Global_Sales})]),
                d3.min([0, d3.min(data, function(d){ return d.Global_Sales})])
            ])
            .range([0,h])

        //SVG
        var svg = chartYears.append('svg')
            .attr('height', h + margin.top + margin.bottom)
            .attr('width', w + margin.left + margin.right)
            .append('g')
            .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');
        //x-axis
        var xAxis = d3.svg.axis()
            .scale(xScale)
            .tickFormat(d3.format('d'))
            .ticks(7)
            .orient('bottom');
        //y-axis
        var yAxis = d3.svg.axis()
            .scale(yScale)
            .tickFormat(d3.formatPrefix('1', 1e6))
            .ticks(12)
            .orient('left');
        //Bars
        var bars = svg.selectAll('rect')
            .data(years)
            .enter()
            .append('rect')
            .attr('transform', 'translate(3,0)')
            .attr('x', function(d, i){
                return i*(BAR_WIDTH + 1)
            })
            .attr('y', function(d){
                return h - (d.Global_Sales / maxSales) * h
            })
            .attr('height', function(d){
                return (d.Global_Sales / maxSales)* h
            })
            .attr('width', BAR_WIDTH)
            .attr('fill', function(d){
            if (d.Year_of_Release == 1996) {
                return COLORS[0]
            } else if (d.Year_of_Release == 1997){
                return COLORS[1]
            } else if (d.Year_of_Release == 1998){
                return COLORS[2]
            } else if (d.Year_of_Release == 1999){
                return COLORS[3]
            } else if (d.Year_of_Release == 2000){
                return COLORS[4]
            } else if (d.Year_of_Release == 2001){
                return COLORS[5]
            }
            })
            .on('mouseover', function(d,i){
                d3.select(this).attr('fill', '#bf5b17')

            })
            .on('mouseout', function(d){

                //until dynamiColor is sorted out....
                if (d.Year_of_Release == 1996) {
                     d3.select(this).attr('fill', COLORS[0])
                } else if (d.Year_of_Release == 1997){
                     d3.select(this).attr('fill', COLORS[1])
                } else if (d.Year_of_Release == 1998){
                     d3.select(this).attr('fill', COLORS[2])
                } else if (d.Year_of_Release == 1999){
                     d3.select(this).attr('fill', COLORS[3])
                } else if (d.Year_of_Release == 2000){
                     d3.select(this).attr('fill', COLORS[4])
                } else if (d.Year_of_Release == 2001){
                     d3.select(this).attr('fill', COLORS[5])
                } else {
                    d3.select(this).attr('fill', COLORS[6])
                }

            })
            .append('title')
            .text(function(d){
                return d.Name +
                    '\nRelase Year: ' + d.Year_of_Release +
                    '\nGenre: ' + d.Genre+
                    '\nGlobal Sales: $' + d.Global_Sales + ' million'
            })
        //X-Axis
        svg.append('g')
            .attr('class', 'axis')
            .attr('transform', 'translate(0,' + h + ')')
            .call(xAxis)
            .append('text') //x axis label
            .attr('class', 'label')
            .attr('y',30)
            .attr('x', w/2)
            .attr('dy','.71em')
            .style('text-anchor','end')
            .text('Release Year');
        // Y-axis
        svg.append('g')
            .attr('class', 'axis')
            .call(yAxis)
            .append('text') // y-axis Label
            .attr('class','label')
            .attr('transform','rotate(-90)')
            .attr('x',-100)
            .attr('y',-50)
            .attr('dy','.71em')
            .style('text-anchor','end')
            .text('Global sales in Millions')

    })
} //End of displayFullTimeline

function displayTopTimeline() {
        d3.csv('VGDATAclean.csv', function(data) {
        //remove previous SVG element
        d3.selectAll('svg').remove();

        //size variables

        //take top 50 sales
        var top = []
                for(var i=0; i<50; i++){
                    top.push(data[i])
                }

        //sort data by year
        var years = top.sort(function(x,y) {
            return d3.ascending(x.Year_of_Release, y.Year_of_Release)
        })
        var w = (years.length *13) + 6
        var BAR_WIDTH = 12
        var maxSales = 0;
            for (var i=0; i<data.length; i++){
                maxSales = Math.max(maxSales, data[i].Global_Sales)
            }

        //create scales based on data
        var xScale = d3.scale.linear()
            .domain(d3.extent(years, function(d) {
                return d.Year_of_Release
            }))
            .range([0,w]);
        var yScale = d3.scale.linear()
            .domain([
                d3.max([0,d3.max(data, function(d) { return d.Global_Sales})]),
                d3.min([0, d3.min(data, function(d){ return d.Global_Sales})])
            ])
            .range([0,h])

        //SVG
        var svg = chartYears.append('svg')
            .attr('height', h + margin.top + margin.bottom)
            .attr('width', w + margin.left + margin.right)
            .append('g')
            .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');
        //x-axis
        var xAxis = d3.svg.axis()
            .scale(xScale)
            .tickFormat(d3.format('d'))
            .ticks(5)
            .orient('bottom');
        //y-axis
        var yAxis = d3.svg.axis()
            .scale(yScale)
            .tickFormat(d3.formatPrefix('1', 1e6))
            .ticks(12)
            .orient('left');
        //Bars
        var bars = svg.selectAll('rect')
            .data(years)
            .enter()
            .append('rect')
            .attr('transform', 'translate(3,0)')
            .attr('x', function(d, i){
                return i*(BAR_WIDTH + 1)
            })
            .attr('y', function(d){
                return h - (d.Global_Sales / maxSales) * h
            })
            .attr('height', function(d){
                return (d.Global_Sales / maxSales)* h
            })
            .attr('width', BAR_WIDTH)
            .attr('fill', function(d){
            if (d.Year_of_Release == 1996) {
                return COLORS[0]
            } else if (d.Year_of_Release == 1997){
                return COLORS[1]
            } else if (d.Year_of_Release == 1998){
                return COLORS[2]
            } else if (d.Year_of_Release == 1999){
                return COLORS[3]
            } else if (d.Year_of_Release == 2000){
                return COLORS[4]
            } else if (d.Year_of_Release == 2001){
                return COLORS[5]
            }
            })
            .on('mouseover', function(d,i){
                d3.select(this).attr('fill', '#bf5b17')

            })
            .on('mouseout', function(d){

                //until dynamiColor is sorted out....
                if (d.Year_of_Release == 1996) {
                     d3.select(this).attr('fill', COLORS[0])
                } else if (d.Year_of_Release == 1997){
                     d3.select(this).attr('fill', COLORS[1])
                } else if (d.Year_of_Release == 1998){
                     d3.select(this).attr('fill', COLORS[2])
                } else if (d.Year_of_Release == 1999){
                     d3.select(this).attr('fill', COLORS[3])
                } else if (d.Year_of_Release == 2000){
                     d3.select(this).attr('fill', COLORS[4])
                } else if (d.Year_of_Release == 2001){
                     d3.select(this).attr('fill', COLORS[5])
                } else {
                    d3.select(this).attr('fill', COLORS[6])
                }

            })
            .append('title')
            .text(function(d){
                return d.Name +
                    '\nRelease Year: ' + d.Year_of_Release +
                    '\nGenre: ' + d.Genre+
                    '\nGlobal Sales: $' + d.Global_Sales + ' million'
            })

        //X-Axis
        svg.append('g')
            .attr('class', 'axis')
            .attr('transform', 'translate(0,' + h + ')')
            .call(xAxis)
            .append('text') //x axis label
            .attr('class', 'label')
            .attr('y',30)
            .attr('x', w/2)
            .attr('dy','.71em')
            .style('text-anchor','end')
            .text('Release Year');
        // Y-axis
        svg.append('g')
            .attr('class', 'axis')
            .call(yAxis)
            .append('text') // y-axis Label
            .attr('class','label')
            .attr('transform','rotate(-90)')
            .attr('x',-100)
            .attr('y',-50)
            .attr('dy','.71em')
            .style('text-anchor','end')
            .text('Global sales in Millions')

    })
} //End of displayTopTimeline
// removed automatic call- now triggered by buttons on the dom with ID selectors
// displayFullTimeline();

/**
* Created by knut on 14-11-03.
*/

var graph = require('../graphDb');
var flow = require('./flow');

describe('when parsing ',function(){
    beforeEach(function(){
        flow.parser.yy = require('../graphDb');
        flow.parser.yy.clear();
        /*flow.parser.parse.parseError= function parseError(str, hash) {
            log.debugconsole.log(str);
        }*/
    });

    it('should handle a nodes and edges',function(){
        var res = flow.parser.parse('graph TD;\nA-->B;');


        var vert = flow.parser.yy.getVertices();
        var edges = flow.parser.yy.getEdges();

        expect(vert['A'].id).toBe('A');
        expect(vert['B'].id).toBe('B');
        expect(edges.length).toBe(1);
        expect(edges[0].start).toBe('A');
        expect(edges[0].end).toBe('B');
        expect(edges[0].type).toBe('arrow');
        expect(edges[0].text).toBe('');
    });

    it('should handle angle bracket '>' as direction LR',function(){
        var res = flow.parser.parse('graph >;A-->B;');


        var vert = flow.parser.yy.getVertices();
        var edges = flow.parser.yy.getEdges();
        var direction = flow.parser.yy.getDirection();

        expect(direction).toBe('LR');

        expect(vert['A'].id).toBe('A');
        expect(vert['B'].id).toBe('B');
        expect(edges.length).toBe(1);
        expect(edges[0].start).toBe('A');
        expect(edges[0].end).toBe('B');
        expect(edges[0].type).toBe('arrow');
        expect(edges[0].text).toBe('');
    });

    it('should handle angle bracket '<' as direction RL',function(){
        var res = flow.parser.parse('graph <;A-->B;');


        var vert = flow.parser.yy.getVertices();
        var edges = flow.parser.yy.getEdges();
        var direction = flow.parser.yy.getDirection();

        expect(direction).toBe('RL');

        expect(vert['A'].id).toBe('A');
        expect(vert['B'].id).toBe('B');
        expect(edges.length).toBe(1);
        expect(edges[0].start).toBe('A');
        expect(edges[0].end).toBe('B');
        expect(edges[0].type).toBe('arrow');
        expect(edges[0].text).toBe('');
    });


    it('should handle caret '^' as direction BT',function(){
        var res = flow.parser.parse('graph ^;A-->B;');


        var vert = flow.parser.yy.getVertices();
        var edges = flow.parser.yy.getEdges();
        var direction = flow.parser.yy.getDirection();

        expect(direction).toBe('BT');

        expect(vert['A'].id).toBe('A');
        expect(vert['B'].id).toBe('B');
        expect(edges.length).toBe(1);
        expect(edges[0].start).toBe('A');
        expect(edges[0].end).toBe('B');
        expect(edges[0].type).toBe('arrow');
        expect(edges[0].text).toBe('');
    });


    it('should handle lower-case \'v\' as direction TB',function(){
        var res = flow.parser.parse('graph v;A-->B;');


        var vert = flow.parser.yy.getVertices();
        var edges = flow.parser.yy.getEdges();
        var direction = flow.parser.yy.getDirection();

        expect(direction).toBe('TB');

        expect(vert['A'].id).toBe('A');
        expect(vert['B'].id).toBe('B');
        expect(edges.length).toBe(1);
        expect(edges[0].start).toBe('A');
        expect(edges[0].end).toBe('B');
        expect(edges[0].type).toBe('arrow');
        expect(edges[0].text).toBe('');
    });

    it('should handle a nodes and edges and a space between link and node',function(){
        var res = flow.parser.parse('graph TD;A --> B;');


        var vert = flow.parser.yy.getVertices();
        var edges = flow.parser.yy.getEdges();

        expect(vert['A'].id).toBe('A');
        expect(vert['B'].id).toBe('B');
        expect(edges.length).toBe(1);
        expect(edges[0].start).toBe('A');
        expect(edges[0].end).toBe('B');
        expect(edges[0].type).toBe('arrow');
        expect(edges[0].text).toBe('');
    });

    it('should handle a nodes and edges, a space between link and node and each line ending without semicolon',function(){
        var res = flow.parser.parse('graph TD\nA --> B\n style e red');


        var vert = flow.parser.yy.getVertices();
        var edges = flow.parser.yy.getEdges();

        expect(vert['A'].id).toBe('A');
        expect(vert['B'].id).toBe('B');
        expect(edges.length).toBe(1);
        expect(edges[0].start).toBe('A');
        expect(edges[0].end).toBe('B');
        expect(edges[0].type).toBe('arrow');
        expect(edges[0].text).toBe('');
    });
    it('should handle statements ending without semicolon',function(){
        var res = flow.parser.parse('graph TD\nA-->B\nB-->C');


        var vert = flow.parser.yy.getVertices();
        var edges = flow.parser.yy.getEdges();

        expect(vert['A'].id).toBe('A');
        expect(vert['B'].id).toBe('B');
        expect(edges.length).toBe(2);
        expect(edges[1].start).toBe('B');
        expect(edges[1].end).toBe('C');
        expect(edges[0].type).toBe('arrow');
        expect(edges[0].text).toBe('');
    });

    it('should handle a comments',function(){
        var res = flow.parser.parse('graph TD;\n%% CComment\n A-->B;');


        var vert = flow.parser.yy.getVertices();
        var edges = flow.parser.yy.getEdges();

        expect(vert['A'].id).toBe('A');
        expect(vert['B'].id).toBe('B');
        expect(edges.length).toBe(1);
        expect(edges[0].start).toBe('A');
        expect(edges[0].end).toBe('B');
        expect(edges[0].type).toBe('arrow');
        expect(edges[0].text).toBe('');
    });
    it('should handle comments a at the start',function(){
        var res = flow.parser.parse('%% Comment\ngraph TD;\n A-->B;');


        var vert = flow.parser.yy.getVertices();
        var edges = flow.parser.yy.getEdges();

        expect(vert['A'].id).toBe('A');
        expect(vert['B'].id).toBe('B');
        expect(edges.length).toBe(1);
        expect(edges[0].start).toBe('A');
        expect(edges[0].end).toBe('B');
        expect(edges[0].type).toBe('arrow');
        expect(edges[0].text).toBe('');
    });
    it('should handle comments at the end',function(){
        var res = flow.parser.parse('graph TD;\n A-->B\n %% Comment at the find\n');


        var vert = flow.parser.yy.getVertices();
        var edges = flow.parser.yy.getEdges();

        expect(vert['A'].id).toBe('A');
        expect(vert['B'].id).toBe('B');
        expect(edges.length).toBe(1);
        expect(edges[0].start).toBe('A');
        expect(edges[0].end).toBe('B');
        expect(edges[0].type).toBe('arrow');
        expect(edges[0].text).toBe('');
    });
    it('should handle comments at the end no trailing newline',function(){
        var res = flow.parser.parse('graph TD;\n A-->B\n%% Commento');


        var vert = flow.parser.yy.getVertices();
        var edges = flow.parser.yy.getEdges();

        expect(vert['A'].id).toBe('A');
        expect(vert['B'].id).toBe('B');
        expect(edges.length).toBe(1);
        expect(edges[0].start).toBe('A');
        expect(edges[0].end).toBe('B');
        expect(edges[0].type).toBe('arrow');
        expect(edges[0].text).toBe('');
    });
    it('should handle comments at the end many trailing newlines',function(){
        var res = flow.parser.parse('graph TD;\n A-->B\n%% Commento\n\n\n');


        var vert = flow.parser.yy.getVertices();
        var edges = flow.parser.yy.getEdges();

        expect(vert['A'].id).toBe('A');
        expect(vert['B'].id).toBe('B');
        expect(edges.length).toBe(1);
        expect(edges[0].start).toBe('A');
        expect(edges[0].end).toBe('B');
        expect(edges[0].type).toBe('arrow');
        expect(edges[0].text).toBe('');
    });
    it('should handle no trailing newlines',function(){
        var res = flow.parser.parse('graph TD;\n A-->B');


        var vert = flow.parser.yy.getVertices();
        var edges = flow.parser.yy.getEdges();

        expect(vert['A'].id).toBe('A');
        expect(vert['B'].id).toBe('B');
        expect(edges.length).toBe(1);
        expect(edges[0].start).toBe('A');
        expect(edges[0].end).toBe('B');
        expect(edges[0].type).toBe('arrow');
        expect(edges[0].text).toBe('');
    });
    it('should handle many trailing newlines',function(){
        var res = flow.parser.parse('graph TD;\n A-->B\n\n');


        var vert = flow.parser.yy.getVertices();
        var edges = flow.parser.yy.getEdges();

        expect(vert['A'].id).toBe('A');
        expect(vert['B'].id).toBe('B');
        expect(edges.length).toBe(1);
        expect(edges[0].start).toBe('A');
        expect(edges[0].end).toBe('B');
        expect(edges[0].type).toBe('arrow');
        expect(edges[0].text).toBe('');
    });
    it('should handle a comments with blank rows in-between',function(){
        var res = flow.parser.parse('graph TD;\n\n\n %% Comment\n A-->B;');


        var vert = flow.parser.yy.getVertices();
        var edges = flow.parser.yy.getEdges();

        expect(vert['A'].id).toBe('A');
        expect(vert['B'].id).toBe('B');
        expect(edges.length).toBe(1);
        expect(edges[0].start).toBe('A');
        expect(edges[0].end).toBe('B');
        expect(edges[0].type).toBe('arrow');
        expect(edges[0].text).toBe('');
    });

    it('should handle a comments mermaid flowchart code in them',function(){
        var res = flow.parser.parse('graph TD;\n\n\n %% Test od>Odd shape]-->|Two line<br>edge comment|ro;\n A-->B;');


        var vert = flow.parser.yy.getVertices();
        var edges = flow.parser.yy.getEdges();

        expect(vert['A'].id).toBe('A');
        expect(vert['B'].id).toBe('B');
        expect(edges.length).toBe(1);
        expect(edges[0].start).toBe('A');
        expect(edges[0].end).toBe('B');
        expect(edges[0].type).toBe('arrow');
        expect(edges[0].text).toBe('');
    });

    it('it should handle a trailing whitespaces after statememnts',function(){
        var res = flow.parser.parse('graph TD;\n\n\n %% Comment\n A-->B; \n B-->C;');


        var vert = flow.parser.yy.getVertices();
        var edges = flow.parser.yy.getEdges();

        expect(vert['A'].id).toBe('A');
        expect(vert['B'].id).toBe('B');
        expect(edges.length).toBe(2);
        expect(edges[0].start).toBe('A');
        expect(edges[0].end).toBe('B');
        expect(edges[0].type).toBe('arrow');
        expect(edges[0].text).toBe('');
    });

    it('should handle node names with "end" substring',function(){
        var res = flow.parser.parse('graph TD\nendpoint --> sender');

        var vert = flow.parser.yy.getVertices();
        var edges = flow.parser.yy.getEdges();

        expect(vert['endpoint'].id).toBe('endpoint');
        expect(vert['sender'].id).toBe('sender');
        expect(edges[0].start).toBe('endpoint');
        expect(edges[0].end).toBe('sender');
    });

    it('should handle node names ending with keywords',function(){
        var res = flow.parser.parse('graph TD\nblend --> monograph');

        var vert = flow.parser.yy.getVertices();
        var edges = flow.parser.yy.getEdges();

        expect(vert['blend'].id).toBe('blend');
        expect(vert['monograph'].id).toBe('monograph');
        expect(edges[0].start).toBe('blend');
        expect(edges[0].end).toBe('monograph');
    });

    it('should handle open ended edges',function(){
        var res = flow.parser.parse('graph TD;A---B;');

        var vert = flow.parser.yy.getVertices();
        var edges = flow.parser.yy.getEdges();


        expect(edges[0].type).toBe('arrow_open');
    });

    it('should handle cross ended edges',function(){
        var res = flow.parser.parse('graph TD;A--xB;');

        var vert = flow.parser.yy.getVertices();
        var edges = flow.parser.yy.getEdges();


        expect(edges[0].type).toBe('arrow_cross');
    });

    it('should handle open ended edges',function(){
        var res = flow.parser.parse('graph TD;A--oB;');

        var vert = flow.parser.yy.getVertices();
        var edges = flow.parser.yy.getEdges();


        expect(edges[0].type).toBe('arrow_circle');
    });
    it('should handle subgraphs',function(){
        var res = flow.parser.parse('graph TD;A-->B;subgraph myTitle;c-->d;end;');

        var vert = flow.parser.yy.getVertices();
        var edges = flow.parser.yy.getEdges();


        expect(edges[0].type).toBe('arrow');
    });

    it('should handle subgraphs',function(){
        var res = flow.parser.parse('graph TD\nA-->B\nsubgraph myTitle\n\n c-->d \nend\n');

        var vert = flow.parser.yy.getVertices();
        var edges = flow.parser.yy.getEdges();


        expect(edges[0].type).toBe('arrow');
    });

    it('should handle nested subgraphs',function(){
        var str = 'graph TD\n' +
            'A-->B\n' +
            'subgraph myTitle\n\n' +
            ' c-->d \n\n' +
            ' subgraph inner\n\n   e-->f \n end \n\n' +
            ' subgraph inner\n\n   h-->i \n end \n\n' +
            'end\n';
        var res = flow.parser.parse(str);

    });

    it('should handle subgraphs',function(){
        var res = flow.parser.parse('graph TD\nA-->B\nsubgraph myTitle\nc-->d\nend;');

        var vert = flow.parser.yy.getVertices();
        var edges = flow.parser.yy.getEdges();


        expect(edges[0].type).toBe('arrow');
    });

    it('should handle subgraphs',function(){
        var res = flow.parser.parse('graph TD\nA-->B\nsubgraph myTitle\nc-- text -->d\nd-->e\n end;');

        var vert = flow.parser.yy.getVertices();
        var edges = flow.parser.yy.getEdges();


        expect(edges[0].type).toBe('arrow');
    });

    it('should handle classDefs with style in classes',function(){
        var res = flow.parser.parse('graph TD\nA-->B\nclassDef exClass font-style:bold;');

        var vert = flow.parser.yy.getVertices();
        var edges = flow.parser.yy.getEdges();


        expect(edges[0].type).toBe('arrow');
    });

    it('should handle classDefs with % in classes',function(){
        var res = flow.parser.parse('graph TD\nA-->B\nclassDef exClass fill:#f96,stroke:#333,stroke-width:4px,font-size:50%,font-style:bold;');

        var vert = flow.parser.yy.getVertices();
        var edges = flow.parser.yy.getEdges();


        expect(edges[0].type).toBe('arrow');
    });

    it('should handle style definitons with more then 1 digit in a row',function(){
        var res = flow.parser.parse('graph TD\n' +
        'A-->B1\n' +
        'A-->B2\n' +
        'A-->B3\n' +
        'A-->B4\n' +
        'A-->B5\n' +
        'A-->B6\n' +
        'A-->B7\n' +
        'A-->B8\n' +
        'A-->B9\n' +
        'A-->B10\n' +
        'A-->B11\n' +
        'linkStyle 10 stroke-width:1px;');

        var vert = flow.parser.yy.getVertices();
        var edges = flow.parser.yy.getEdges();


        expect(edges[0].type).toBe('arrow');
    });

    it('should handle line interpolation default definitions',function(){
        var res = flow.parser.parse('graph TD\n' +
        'A-->B\n' +
        'linkStyle default interpolate basis');

        var vert = flow.parser.yy.getVertices();
        var edges = flow.parser.yy.getEdges();


        expect(edges.defaultInterpolate).toBe('basis');
    });

    it('should handle line interpolation numbered definitions',function(){
        var res = flow.parser.parse('graph TD\n' +
        'A-->B\n' +
        'A-->C\n' +
        'linkStyle 0 interpolate basis\n' +
        'linkStyle 1 interpolate cardinal');

        var vert = flow.parser.yy.getVertices();
        var edges = flow.parser.yy.getEdges();

        expect(edges[0].interpolate).toBe('basis');
        expect(edges[1].interpolate).toBe('cardinal');
    });

    it('should handle line interpolation default with style',function(){
        var res = flow.parser.parse('graph TD\n' +
        'A-->B\n' +
        'linkStyle default interpolate basis stroke-width:1px;');

        var vert = flow.parser.yy.getVertices();
        var edges = flow.parser.yy.getEdges();


        expect(edges.defaultInterpolate).toBe('basis');
    });

    it('should handle line interpolation numbered with style',function(){
        var res = flow.parser.parse('graph TD\n' +
        'A-->B\n' +
        'A-->C\n' +
        'linkStyle 0 interpolate basis stroke-width:1px;\n' +
        'linkStyle 1 interpolate cardinal stroke-width:1px;');

        var vert = flow.parser.yy.getVertices();
        var edges = flow.parser.yy.getEdges();

        expect(edges[0].interpolate).toBe('basis');
        expect(edges[1].interpolate).toBe('cardinal');
    });

    describe('it should handle interaction, ',function(){

        it('it should be possible to use click to a callback',function(){
            spyOn(graph,'setClickEvent');
            var res = flow.parser.parse('graph TD\nA-->B\nclick A callback');

            var vert = flow.parser.yy.getVertices();
            var edges = flow.parser.yy.getEdges();

            expect(graph.setClickEvent).toHaveBeenCalledWith('A','callback',undefined,undefined);
        });

        it('it should be possible to use click to a callback with toolip',function(){
            spyOn(graph,'setClickEvent');
            var res = flow.parser.parse('graph TD\nA-->B\nclick A callback "tooltip"');

            var vert = flow.parser.yy.getVertices();
            var edges = flow.parser.yy.getEdges();

            expect(graph.setClickEvent).toHaveBeenCalledWith('A','callback',undefined,'tooltip');
        });

        it('should handle interaction - click to a link',function(){
            spyOn(graph,'setClickEvent');
            var res = flow.parser.parse('graph TD\nA-->B\nclick A "click.html"');

            var vert = flow.parser.yy.getVertices();
            var edges = flow.parser.yy.getEdges();

            expect(graph.setClickEvent).toHaveBeenCalledWith('A',undefined,'click.html',undefined);
        });
        it('should handle interaction - click to a link with tooltip',function(){
            spyOn(graph,'setClickEvent');
            var res = flow.parser.parse('graph TD\nA-->B\nclick A "click.html" "tooltip"');

            var vert = flow.parser.yy.getVertices();
            var edges = flow.parser.yy.getEdges();

            expect(graph.setClickEvent).toHaveBeenCalledWith('A',undefined,'click.html','tooltip');
        });
    });


    describe('it should handle text on edges',function(){
        it('it should handle text without space',function(){
            var res = flow.parser.parse('graph TD;A--x|textNoSpace|B;');

            var vert = flow.parser.yy.getVertices();
            var edges = flow.parser.yy.getEdges();


            expect(edges[0].type).toBe('arrow_cross');
        });

        it('should handle  with space',function(){
            var res = flow.parser.parse('graph TD;A--x|text including space|B;');

            var vert = flow.parser.yy.getVertices();
            var edges = flow.parser.yy.getEdges();


            expect(edges[0].type).toBe('arrow_cross');
        });

        it('it should handle text with /',function(){
            var res = flow.parser.parse('graph TD;A--x|text with / should work|B;');

            var vert = flow.parser.yy.getVertices();
            var edges = flow.parser.yy.getEdges();


            expect(edges[0].text).toBe('text with / should work');
        });

        it('it should handle space and space between vertices and link',function(){
            var res = flow.parser.parse('graph TD;A --x|textNoSpace| B;');

            var vert = flow.parser.yy.getVertices();
            var edges = flow.parser.yy.getEdges();


            expect(edges[0].type).toBe('arrow_cross');
        });

        it('should handle space and CAPS',function(){
            var res = flow.parser.parse('graph TD;A--x|text including CAPS space|B;');

            var vert = flow.parser.yy.getVertices();
            var edges = flow.parser.yy.getEdges();


            expect(edges[0].type).toBe('arrow_cross');
        });

        it('should handle space and dir',function(){
            var res = flow.parser.parse('graph TD;A--x|text including URL space|B;');

            var vert = flow.parser.yy.getVertices();
            var edges = flow.parser.yy.getEdges();


            expect(edges[0].type).toBe('arrow_cross');
            expect(edges[0].text).toBe('text including URL space');

        });

        it('should handle space and send',function(){
            var res = flow.parser.parse('graph TD;A--text including URL space and send-->B;');

            var vert = flow.parser.yy.getVertices();
            var edges = flow.parser.yy.getEdges();


            expect(edges[0].type).toBe('arrow');
            expect(edges[0].text).toBe('text including URL space and send');

        });
        it('should handle space and send',function(){
            var res = flow.parser.parse('graph TD;A-- text including URL space and send -->B;');

            var vert = flow.parser.yy.getVertices();
            var edges = flow.parser.yy.getEdges();


            expect(edges[0].type).toBe('arrow');
            expect(edges[0].text).toBe('text including URL space and send');

        });

        it('should handle space and dir (TD)',function(){
            var res = flow.parser.parse('graph TD;A--x|text including R TD space|B;');

            var vert = flow.parser.yy.getVertices();
            var edges = flow.parser.yy.getEdges();


            expect(edges[0].type).toBe('arrow_cross');
            expect(edges[0].text).toBe('text including R TD space');

        });
        it('should handle `',function(){
            var res = flow.parser.parse('graph TD;A--x|text including `|B;');

            var vert = flow.parser.yy.getVertices();
            var edges = flow.parser.yy.getEdges();


            expect(edges[0].type).toBe('arrow_cross');
            expect(edges[0].text).toBe('text including `');

        });
        it('should handle v in node ids only v',function(){
            // only v
            var res = flow.parser.parse('graph TD;A--xv(my text);');

            var vert = flow.parser.yy.getVertices();
            var edges = flow.parser.yy.getEdges();


            expect(edges[0].type).toBe('arrow_cross');
            expect(vert['v'].text).toBe('my text');

        });
        it('should handle v in node ids v at end',function(){
            // v at end
            var res = flow.parser.parse('graph TD;A--xcsv(my text);');

            var vert = flow.parser.yy.getVertices();
            var edges = flow.parser.yy.getEdges();


            expect(edges[0].type).toBe('arrow_cross');
            expect(vert['csv'].text).toBe('my text');

        });
        it('should handle v in node ids v in middle',function(){
            // v in middle
            var res = flow.parser.parse('graph TD;A--xava(my text);');

            var vert = flow.parser.yy.getVertices();
            var edges = flow.parser.yy.getEdges();


            expect(edges[0].type).toBe('arrow_cross');
            expect(vert['ava'].text).toBe('my text');

        });
        it('should handle v in node ids, v at start',function(){
            // v at start
            var res = flow.parser.parse('graph TD;A--xva(my text);');

            var vert = flow.parser.yy.getVertices();
            var edges = flow.parser.yy.getEdges();


            expect(edges[0].type).toBe('arrow_cross');
            expect(vert['va'].text).toBe('my text');

        });
        it('should handle keywords',function(){
            var res = flow.parser.parse('graph TD;A--x|text including graph space|B;');

            var vert = flow.parser.yy.getVertices();
            var edges = flow.parser.yy.getEdges();

            expect(edges[0].text).toBe('text including graph space');

        });
        it('should handle keywords',function(){
            var res = flow.parser.parse('graph TD;V-->a[v]');
            var vert = flow.parser.yy.getVertices();
            var edges = flow.parser.yy.getEdges();
            expect(vert['a'].text).toBe('v');
        });
        it('should handle keywords',function(){
            var res = flow.parser.parse('graph TD;V-->a[v]');
            var vert = flow.parser.yy.getVertices();
            var edges = flow.parser.yy.getEdges();
            expect(vert['a'].text).toBe('v');
        });
        it('should handle quoted text',function(){
            var res = flow.parser.parse('graph TD;V-- "test string()" -->a[v]');
            var vert = flow.parser.yy.getVertices();
            var edges = flow.parser.yy.getEdges();
            expect(edges[0].text).toBe('test string()');
        });
    });

    describe('it should handle new line type notation',function() {
        it('it should handle regular lines', function () {
            var res = flow.parser.parse('graph TD;A-->B;');

            var vert = flow.parser.yy.getVertices();
            var edges = flow.parser.yy.getEdges();

            expect(edges[0].stroke).toBe('normal');
        });
        it('it should handle dotted lines', function () {
            var res = flow.parser.parse('graph TD;A-.->B;');

            var vert = flow.parser.yy.getVertices();
            var edges = flow.parser.yy.getEdges();


            expect(edges[0].stroke).toBe('dotted');
        });
        it('it should handle dotted lines', function () {
            var res = flow.parser.parse('graph TD;A==>B;');

            var vert = flow.parser.yy.getVertices();
            var edges = flow.parser.yy.getEdges();


            expect(edges[0].stroke).toBe('thick');
        });
        it('it should handle text on lines', function () {
            var res = flow.parser.parse('graph TD;A-- test text with == -->B;');

            var vert = flow.parser.yy.getVertices();
            var edges = flow.parser.yy.getEdges();


            expect(edges[0].stroke).toBe('normal');
        });
        it('it should handle text on lines', function () {
            var res = flow.parser.parse('graph TD;A-. test text with == .->B;');

            var vert = flow.parser.yy.getVertices();
            var edges = flow.parser.yy.getEdges();


            expect(edges[0].stroke).toBe('dotted');
        });
        it('it should handle text on lines', function () {
            var res = flow.parser.parse('graph TD;A== test text with - ==>B;');

            var vert = flow.parser.yy.getVertices();
            var edges = flow.parser.yy.getEdges();


            expect(edges[0].stroke).toBe('thick');
        });
    });

    describe('it should handle text on edges using the new notation',function(){
        it('it should handle text without space',function(){
            var res = flow.parser.parse('graph TD;A-- textNoSpace --xB;');

            var vert = flow.parser.yy.getVertices();
            var edges = flow.parser.yy.getEdges();


            expect(edges[0].type).toBe('arrow_cross');
        });

        it('it should handle text with multiple leading space',function(){
            var res = flow.parser.parse('graph TD;A--    textNoSpace --xB;');

            var vert = flow.parser.yy.getVertices();
            var edges = flow.parser.yy.getEdges();


            expect(edges[0].type).toBe('arrow_cross');
        });


        it('should handle  with space',function(){
            var res = flow.parser.parse('graph TD;A-- text including space --xB;');

            var vert = flow.parser.yy.getVertices();
            var edges = flow.parser.yy.getEdges();


            expect(edges[0].type).toBe('arrow_cross');
        });

        it('it should handle text with /',function(){
            var res = flow.parser.parse('graph TD;A -- text with / should work --x B;');

            var vert = flow.parser.yy.getVertices();
            var edges = flow.parser.yy.getEdges();


            expect(edges[0].text).toBe('text with / should work');
        });

        it('it should handle space and space between vertices and link',function(){
            var res = flow.parser.parse('graph TD;A -- textNoSpace --x B;');

            var vert = flow.parser.yy.getVertices();
            var edges = flow.parser.yy.getEdges();


            expect(edges[0].type).toBe('arrow_cross');
        });

        it('should handle space and CAPS',function(){
            var res = flow.parser.parse('graph TD;A-- text including CAPS space --xB;');

            var vert = flow.parser.yy.getVertices();
            var edges = flow.parser.yy.getEdges();


            expect(edges[0].type).toBe('arrow_cross');
        });

        it('should handle space and dir',function(){
            var res = flow.parser.parse('graph TD;A-- text including URL space --xB;');

            var vert = flow.parser.yy.getVertices();
            var edges = flow.parser.yy.getEdges();


            expect(edges[0].type).toBe('arrow_cross');
            expect(edges[0].text).toBe('text including URL space');

        });

        it('should handle space and dir (TD)',function(){
            var res = flow.parser.parse('graph TD;A-- text including R TD space --xB;');

            var vert = flow.parser.yy.getVertices();
            var edges = flow.parser.yy.getEdges();


            expect(edges[0].type).toBe('arrow_cross');
            expect(edges[0].text).toBe('text including R TD space');

        });
        it('should handle keywords',function(){
            var res = flow.parser.parse('graph TD;A-- text including graph space and v --xB;');

            var vert = flow.parser.yy.getVertices();
            var edges = flow.parser.yy.getEdges();

            expect(edges[0].text).toBe('text including graph space and v');

        });
        it('should handle keywords',function(){
            var res = flow.parser.parse('graph TD;A-- text including graph space and v --xB[blav]');

            var vert = flow.parser.yy.getVertices();
            var edges = flow.parser.yy.getEdges();

            expect(edges[0].text).toBe('text including graph space and v');

        });
        //xit('should handle text on open links',function(){
        //    var res = flow.parser.parse('graph TD;A-- text including graph space --B');
        //
        //    var vert = flow.parser.yy.getVertices();
        //    var edges = flow.parser.yy.getEdges();
        //
        //    expect(edges[0].text).toBe('text including graph space');
        //
        //});
    });




    it('should handle multi-line text',function(){
        var res = flow.parser.parse('graph TD;A--o|text space|B;\n B-->|more text with space|C;');

        var vert = flow.parser.yy.getVertices();
        var edges = flow.parser.yy.getEdges();

        expect(edges[0].type).toBe('arrow_circle');
        expect(edges[1].type).toBe('arrow');
        expect(vert['A'].id).toBe('A');
        expect(vert['B'].id).toBe('B');
        expect(vert['C'].id).toBe('C');
        expect(edges.length).toBe(2);
        expect(edges[0].start).toBe('A');
        expect(edges[0].end).toBe('B');
        //expect(edges[0].text).toBe('text space');
        expect(edges[1].start).toBe('B');
        expect(edges[1].end).toBe('C');
        expect(edges[1].text).toBe('more text with space');
    });


    it('should handle multiple edges',function(){
        var res = flow.parser.parse('graph TD;A---|This is the 123 s text|B;\nA---|This is the second edge|B;');
        var vert = flow.parser.yy.getVertices();
        var edges = flow.parser.yy.getEdges();

        expect(vert['A'].id).toBe('A');
        expect(vert['B'].id).toBe('B');
        expect(edges.length).toBe(2);
        expect(edges[0].start).toBe('A');
        expect(edges[0].end).toBe('B');
        expect(edges[0].text).toBe('This is the 123 s text');
        expect(edges[1].start).toBe('A');
        expect(edges[1].end).toBe('B');
        expect(edges[1].text).toBe('This is the second edge');
    });

    it('should handle text in vertices with space',function(){
        var res = flow.parser.parse('graph TD;A[chimpansen hoppar]-->C;');

        var vert = flow.parser.yy.getVertices();
        var edges = flow.parser.yy.getEdges();

        expect(vert['A'].type).toBe('square');
        expect(vert['A'].text).toBe('chimpansen hoppar');
    });

    it('should handle text in vertices with space with spaces between vertices and link',function(){
        var res = flow.parser.parse('graph TD;A[chimpansen hoppar] --> C;');

        var vert = flow.parser.yy.getVertices();
        var edges = flow.parser.yy.getEdges();

        expect(vert['A'].type).toBe('square');
        expect(vert['A'].text).toBe('chimpansen hoppar');
    });

    it('should handle quoted text in vertices ',function(){
        var res = flow.parser.parse('graph TD;A["chimpansen hoppar ()[]"] --> C;');

        var vert = flow.parser.yy.getVertices();
        var edges = flow.parser.yy.getEdges();

        expect(vert['A'].type).toBe('square');
        expect(vert['A'].text).toBe('chimpansen hoppar ()[]');
    });

    it('should handle text in circle vertices with space',function(){
        var res = flow.parser.parse('graph TD;A((chimpansen hoppar))-->C;');

        var vert = flow.parser.yy.getVertices();
        var edges = flow.parser.yy.getEdges();

        expect(vert['A'].type).toBe('circle');
        expect(vert['A'].text).toBe('chimpansen hoppar');
    });

    it('should handle text in ellipse vertices', function(){
        var res = flow.parser.parse('graph TD\nA(-this is an ellipse-)-->B');

        var vert = flow.parser.yy.getVertices();
        var edges = flow.parser.yy.getEdges();

        expect(vert['A'].type).toBe('ellipse');
        expect(vert['A'].text).toBe('this is an ellipse');
    });

    it('should handle text in diamond vertices with space',function(){
        var res = flow.parser.parse('graph TD;A(chimpansen hoppar)-->C;');

        var vert = flow.parser.yy.getVertices();
        var edges = flow.parser.yy.getEdges();

        expect(vert['A'].type).toBe('round');
        expect(vert['A'].text).toBe('chimpansen hoppar');
    });

    it('should handle text in with ?',function(){
        var res = flow.parser.parse('graph TD;A(?)-->|?|C;');

        var vert = flow.parser.yy.getVertices();
        var edges = flow.parser.yy.getEdges();

        expect(vert['A'].text).toBe('?');
        expect(edges[0].text).toBe('?');
    });
    it('should handle text in with ????????????',function(){
        var res = flow.parser.parse('graph TD;A(????????????)-->|????????????|C;');

        var vert = flow.parser.yy.getVertices();
        var edges = flow.parser.yy.getEdges();

        expect(vert['A'].text).toBe('????????????');
        expect(edges[0].text).toBe('????????????');
    });

    it('should handle text in with ,.?!+-*',function(){
        var res = flow.parser.parse('graph TD;A(,.?!+-*)-->|,.?!+-*|C;');

        var vert = flow.parser.yy.getVertices();
        var edges = flow.parser.yy.getEdges();

        expect(vert['A'].text).toBe(',.?!+-*');
        expect(edges[0].text).toBe(',.?!+-*');
    });

    describe('it should handle text in vertices, ',function(){

        it('it should handle space',function(){
            var res = flow.parser.parse('graph TD;A-->C(Chimpansen hoppar);');

            var vert = flow.parser.yy.getVertices();
            var edges = flow.parser.yy.getEdges();

            expect(vert['C'].type).toBe('round');
            expect(vert['C'].text).toBe('Chimpansen hoppar');
        });
        it('it should handle ?????? and minus',function(){
            var res = flow.parser.parse('graph TD;A-->C{Chimpansen hoppar ??????-??????};');

            var vert = flow.parser.yy.getVertices();
            var edges = flow.parser.yy.getEdges();

            expect(vert['C'].type).toBe('diamond');
            expect(vert['C'].text).toBe('Chimpansen hoppar ??????-??????');
        });

        it('it should handle with ??????, minus and space and br',function(){
            var res = flow.parser.parse('graph TD;A-->C(Chimpansen hoppar ??????  <br> -  ??????);');

            var vert = flow.parser.yy.getVertices();
            var edges = flow.parser.yy.getEdges();

            expect(vert['C'].type).toBe('round');
            expect(vert['C'].text).toBe('Chimpansen hoppar ??????  <br> -  ??????');
        });
        //xit('it should handle ??????, minus and space and br',function(){
        //    var res = flow.parser.parse('graph TD; A[Object&#40;foo,bar&#41;]-->B(Thing);');
        //
        //    var vert = flow.parser.yy.getVertices();
        //    var edges = flow.parser.yy.getEdges();
        //
        //    expect(vert['C'].type).toBe('round');
        //    expect(vert['C'].text).toBe(' A[Object&#40;foo,bar&#41;]-->B(Thing);');
        //});
        it('it should handle unicode chars',function(){
            var res = flow.parser.parse('graph TD;A-->C(????????????);');

            var vert = flow.parser.yy.getVertices();

            expect(vert['C'].text).toBe('????????????');
        });
        it('it should handle backslask',function(){
            var res = flow.parser.parse('graph TD;A-->C(c:\\windows);');

            var vert = flow.parser.yy.getVertices();

            expect(vert['C'].text).toBe('c:\\windows');
        });
        it('it should handle CAPS',function(){
            var res = flow.parser.parse('graph TD;A-->C(some CAPS);');

            var vert = flow.parser.yy.getVertices();
            var edges = flow.parser.yy.getEdges();

            expect(vert['C'].type).toBe('round');
            expect(vert['C'].text).toBe('some CAPS');
        });
        it('it should handle directions',function(){
            var res = flow.parser.parse('graph TD;A-->C(some URL);');

            var vert = flow.parser.yy.getVertices();
            var edges = flow.parser.yy.getEdges();

            expect(vert['C'].type).toBe('round');
            expect(vert['C'].text).toBe('some URL');
        });
    });

    it('should handle a single node',function(){
        // Silly but syntactically correct
        var res = flow.parser.parse('graph TD;A;');

        var vert = flow.parser.yy.getVertices();
        var edges = flow.parser.yy.getEdges();

        expect(edges.length).toBe(0);
        expect(vert['A'].styles.length).toBe(0);
    });

    it('should handle a single square node',function(){
        // Silly but syntactically correct
        var res = flow.parser.parse('graph TD;a[A];');

        var vert = flow.parser.yy.getVertices();
        var edges = flow.parser.yy.getEdges();

        expect(edges.length).toBe(0);
        expect(vert['a'].styles.length).toBe(0);
        expect(vert['a'].type).toBe('square');
    });
    it('should handle a single round square node',function(){
        // Silly but syntactically correct
        var res = flow.parser.parse('graph TD;a[A];');

        var vert = flow.parser.yy.getVertices();
        var edges = flow.parser.yy.getEdges();

        expect(edges.length).toBe(0);
        expect(vert['a'].styles.length).toBe(0);
        expect(vert['a'].type).toBe('square');
    });
    it('should handle a single circle node',function(){
        // Silly but syntactically correct
        var res = flow.parser.parse('graph TD;a((A));');

        var vert = flow.parser.yy.getVertices();
        var edges = flow.parser.yy.getEdges();

        expect(edges.length).toBe(0);
        expect(vert['a'].type).toBe('circle');
    });
    it('should handle a single round node',function(){
        // Silly but syntactically correct
        var res = flow.parser.parse('graph TD;a(A);');

        var vert = flow.parser.yy.getVertices();
        var edges = flow.parser.yy.getEdges();

        expect(edges.length).toBe(0);
        expect(vert['a'].type).toBe('round');
    });
    it('should handle a single odd node',function(){
        // Silly but syntactically correct
        var res = flow.parser.parse('graph TD;a>A];');

        var vert = flow.parser.yy.getVertices();
        var edges = flow.parser.yy.getEdges();

        expect(edges.length).toBe(0);
        expect(vert['a'].type).toBe('odd');
    });
    it('should handle a single diamond node',function(){
        // Silly but syntactically correct
        var res = flow.parser.parse('graph TD;a{A};');

        var vert = flow.parser.yy.getVertices();
        var edges = flow.parser.yy.getEdges();

        expect(edges.length).toBe(0);
        expect(vert['a'].type).toBe('diamond');
    });
    it('should handle a single diamond node with html in it',function(){
        // Silly but syntactically correct
        var res = flow.parser.parse('graph TD;a{A <br> end};');

        var vert = flow.parser.yy.getVertices();
        var edges = flow.parser.yy.getEdges();

        expect(edges.length).toBe(0);
        expect(vert['a'].type).toBe('diamond');
        expect(vert['a'].text).toBe('A <br> end');
    });
    it('should handle a single round node with html in it',function(){
        // Silly but syntactically correct
        var res = flow.parser.parse('graph TD;a(A <br> end);');

        var vert = flow.parser.yy.getVertices();
        var edges = flow.parser.yy.getEdges();

        expect(edges.length).toBe(0);
        expect(vert['a'].type).toBe('round');
        expect(vert['a'].text).toBe('A <br> end');
    });
    it('should handle a single node with alphanumerics starting on a char',function(){
        // Silly but syntactically correct
        var res = flow.parser.parse('graph TD;id1;');

        var vert = flow.parser.yy.getVertices();
        var edges = flow.parser.yy.getEdges();

        expect(edges.length).toBe(0);
        expect(vert['id1'].styles.length).toBe(0);
    });
    it('should handle a single node with alphanumerics starting on a num',function(){
        // Silly but syntactically correct
        var res = flow.parser.parse('graph TD;1id;');

        var vert = flow.parser.yy.getVertices();
        var edges = flow.parser.yy.getEdges();

        expect(edges.length).toBe(0);
        expect(vert['1id'].styles.length).toBe(0);
    });
    it('should handle a single node with alphanumerics containing a minus sign',function(){
        // Silly but syntactically correct
        var res = flow.parser.parse('graph TD;i-d;');

        var vert = flow.parser.yy.getVertices();
        var edges = flow.parser.yy.getEdges();

        expect(edges.length).toBe(0);
        expect(vert['i-d'].styles.length).toBe(0);
    });
    //log.debug(flow.parser.parse('graph TD;style Q background:#fff;'));
    it('should handle styles for vertices',function(){
        var res = flow.parser.parse('graph TD;style Q background:#fff;');

        var vert = flow.parser.yy.getVertices();
        var edges = flow.parser.yy.getEdges();

        var style = vert['Q'].styles[0];

        expect(vert['Q'].styles.length).toBe(1);
        expect(vert['Q'].styles[0]).toBe('background:#fff');
    });

    //log.debug(flow.parser.parse('graph TD;style Q background:#fff;'));
    it('should handle styles for edges',function(){
        var res = flow.parser.parse('graph TD;a-->b;\nstyle #0 stroke: #f66;');

        var edges = flow.parser.yy.getEdges();

        expect(edges.length).toBe(1);
    });

    it('should handle multiple styles for a vortex',function(){
        var res = flow.parser.parse('graph TD;style R background:#fff,border:1px solid red;');

        var vert = flow.parser.yy.getVertices();
        var edges = flow.parser.yy.getEdges();

        expect(vert['R'].styles.length).toBe(2);
        expect(vert['R'].styles[0]).toBe('background:#fff');
        expect(vert['R'].styles[1]).toBe('border:1px solid red');
    });

    it('should handle multiple styles in a graph',function(){
        var res = flow.parser.parse('graph TD;style S background:#aaa;\nstyle T background:#bbb,border:1px solid red;');

        var vert = flow.parser.yy.getVertices();
        var edges = flow.parser.yy.getEdges();

        expect(vert['S'].styles.length).toBe(1);
        expect(vert['T'].styles.length).toBe(2);
        expect(vert['S'].styles[0]).toBe('background:#aaa');
        expect(vert['T'].styles[0]).toBe('background:#bbb');
        expect(vert['T'].styles[1]).toBe('border:1px solid red');
    });

    it('should handle styles and graph definitons in a graph',function(){
        var res = flow.parser.parse('graph TD;S-->T;\nstyle S background:#aaa;\nstyle T background:#bbb,border:1px solid red;');

        var vert = flow.parser.yy.getVertices();
        var edges = flow.parser.yy.getEdges();

        expect(vert['S'].styles.length).toBe(1);
        expect(vert['T'].styles.length).toBe(2);
        expect(vert['S'].styles[0]).toBe('background:#aaa');
        expect(vert['T'].styles[0]).toBe('background:#bbb');
        expect(vert['T'].styles[1]).toBe('border:1px solid red');
    });
    it('should handle styles and graph definitons in a graph',function(){
        var res = flow.parser.parse('graph TD;style T background:#bbb,border:1px solid red;');
        //var res = flow.parser.parse('graph TD;style T background: #bbb;');

        var vert = flow.parser.yy.getVertices();

        expect(vert['T'].styles.length).toBe(2);
        expect(vert['T'].styles[0]).toBe('background:#bbb');
        expect(vert['T'].styles[1]).toBe('border:1px solid red');
    });

    describe('special characters should be be handled.',function(){
        var charTest = function(char){
            var res = flow.parser.parse('graph TD;A('+char+')-->B;');

            var vert = flow.parser.yy.getVertices();
            var edges = flow.parser.yy.getEdges();

            expect(vert['A'].id).toBe('A');
            expect(vert['B'].id).toBe('B');
            expect(vert['A'].text).toBe(char);
        };

        it('it should be able to parse a \'.\'',function(){
            charTest('.');
            charTest('Start 103a.a1');
        });

        it('it should be able to parse text containing \'_\'',function(){
            charTest('_');
        });

        it('it should be able to parse a \':\'',function(){
            charTest(':');
        });

        it('it should be able to parse a \',\'',function(){
            charTest(',');
        });

        it('it should be able to parse text containing \'-\'',function(){
            charTest('a-b');
        });

        it('it should be able to parse a \'+\'',function(){
            charTest('+');
        });

        it('it should be able to parse a \'*\'',function(){
            charTest('*');
        });

        it('it should be able to parse a \'<\'',function(){
            charTest('<');
        });

        it('it should be able to parse a \'>\'',function(){
            charTest('>');
        });

        it('it should be able to parse a \'=\'',function(){
            charTest('=');
        });

    });

    it('should be possible to declare a class',function(){
        var res = flow.parser.parse('graph TD;classDef exClass background:#bbb,border:1px solid red;');
        //var res = flow.parser.parse('graph TD;style T background: #bbb;');

        var classes = flow.parser.yy.getClasses();

        expect(classes['exClass'].styles.length).toBe(2);
        expect(classes['exClass'].styles[0]).toBe('background:#bbb');
        expect(classes['exClass'].styles[1]).toBe('border:1px solid red');
    });

    it('should be possible to declare a class with a dot in the style',function(){
        var res = flow.parser.parse('graph TD;classDef exClass background:#bbb,border:1.5px solid red;');
        //var res = flow.parser.parse('graph TD;style T background: #bbb;');

        var classes = flow.parser.yy.getClasses();

        expect(classes['exClass'].styles.length).toBe(2);
        expect(classes['exClass'].styles[0]).toBe('background:#bbb');
        expect(classes['exClass'].styles[1]).toBe('border:1.5px solid red');
    });
    it('should be possible to declare a class with a space in the style',function(){
        var res = flow.parser.parse('graph TD;classDef exClass background:  #bbb,border:1.5px solid red;');
        //var res = flow.parser.parse('graph TD;style T background  :  #bbb;');

        var classes = flow.parser.yy.getClasses();

        expect(classes['exClass'].styles.length).toBe(2);
        expect(classes['exClass'].styles[0]).toBe('background:  #bbb');
        expect(classes['exClass'].styles[1]).toBe('border:1.5px solid red');
    });
    it('should be possible to apply a class to a vertex',function(){
        var statement = '';

        statement = statement + 'graph TD;' + '\n';
        statement = statement + 'classDef exClass background:#bbb,border:1px solid red;' + '\n';
        statement = statement + 'a-->b;' + '\n';
        statement = statement + 'class a exClass;';

        var res = flow.parser.parse(statement);

        var classes = flow.parser.yy.getClasses();

        expect(classes['exClass'].styles.length).toBe(2);
        expect(classes['exClass'].styles[0]).toBe('background:#bbb');
        expect(classes['exClass'].styles[1]).toBe('border:1px solid red');
    });
    it('should be possible to apply a class to a comma separated list of vertices',function(){
        var statement = '';

        statement = statement + 'graph TD;' + '\n';
        statement = statement + 'classDef exClass background:#bbb,border:1px solid red;' + '\n';
        statement = statement + 'a-->b;' + '\n';
        statement = statement + 'class a,b exClass;';

        var res = flow.parser.parse(statement);

        var classes = flow.parser.yy.getClasses();
        var vertices  = flow.parser.yy.getVertices();

        expect(classes['exClass'].styles.length).toBe(2);
        expect(classes['exClass'].styles[0]).toBe('background:#bbb');
        expect(classes['exClass'].styles[1]).toBe('border:1px solid red');
        expect(vertices['a'].classes[0]).toBe('exClass');
        expect(vertices['b'].classes[0]).toBe('exClass');
    });
});



// eppstein KSP
//
// This is a simplified eppstein algorithm without considering 
// any thing special for the size of the out degree edges. So 
// there is no heap of 3-outdegree. It just keeps track of the
// array of edges that need switching.
//
function eppsteinKSP (graph) {
    this.buildTree = function (startId, endId) {
        var self = this;
        // lookup hash for array of edges
        self.altPath = {};
        // for uId creation
        var count = 1;
        // for results
        var pQ = new PriorityQueue();
        // array of edge ids which changed
        self.altPath[count] = [];
        pQ.push(0, count);
        count++;
        // dfs
        var stk = [];
        self.graph.nodes[startId].map = [];
        stk.push(startId);
        var ptr;
        while (ptr = stk.pop()) {
            var map = self.graph.nodes[ptr].map;
            var my_delta = 0;
            jQuery.each(map, function (ix, e) {
                my_delta += self.graph.edges[e].delta;
            });
            // walk and explore
            while (ptr != endId) {
                var thisNode = self.graph.nodes[ptr];
                // look for un-used edges
                var oEdgs = {};
                jQuery.each(thisNode.out, function (n,e) {
                    oEdgs[e] = e;
                });
                delete oEdgs[thisNode.spEdge];
                // look around for oppurtunities
                jQuery.each (oEdgs, function (e, v) {
                    var nxt = self.graph.edges[e].dst;
                    stk.push(nxt);
                    var fn = self.graph.nodes[nxt];
                    // copy map
                    fn.map = map.slice();
                    // append map
                    fn.map.push(e);
                    self.altPath[count] = fn.map;
                    pQ.push(my_delta + self.graph.edges[e].delta, count);
                    count++;
                });
                // walk
                ptr = self.graph.edges[thisNode.spEdge].dst;
            };
        }
        // dump the pQ
        var vv;
        while (vv = pQ.pop()) {
            var delta = self.graph.nodes[startId].cost;
            jQuery.each(self.altPath[vv], function (ii, v) {
                delta += self.graph.edges[v].delta;
            });
            console.log (self.altPath[vv]);
            console.log (delta);
        };
    };
    this.getKSP = function (startId, endId) {
        var self = this;
        // get SP
        var rD = new RevDijkstra(self.graph);
        rD.findSP(startId, endId);
        // set up the delta's for the edges
        jQuery.each(self.graph.nodes, function (kk, nObj) {
            jQuery.each(nObj.out, function (rNId, eId) {
                rObj = self.graph.nodes[rNId];
                self.graph.edges[eId].delta =  rObj.cost - nObj.cost + self.graph.edges[eId].cost;
            });
        });
        self.buildTree(startId, endId);
    };
    this.graph = graph;
}

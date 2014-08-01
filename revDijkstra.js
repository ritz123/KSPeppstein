// RevDijkstra



// reverse Dijkstra
function RevDijkstra (graph) {
    
    // graph should be of the form
    // {
    //     nodes : {n1: {out: {n2: e1}, in: {n4: e5}, id: n1}}},
    //     edges : {e1: {cost: 4, id: e1}}
    // }
    
    // reverse shortest path
    this.findSP = function (sId, tId) {
        var self = this;
        var s = self.graph.nodes[sId];
        var t = self.graph.nodes[tId];
        if (!s || !t) {
            console.log('Error: wrong index');
            return false;
        }
        // BFS and cost
        // prepare the cost field
        jQuery.each(self.graph.nodes, function (n) {
            delete n.cost; 
        });
        var pQ = new PriorityQueue();
        t.cost = 0;
        pQ.push(0,t);
        var nd;
        while (nd = pQ.pop()) {
            // explore node
            if (nd.id === sId) {
                // we have reached the start node
            } else {
                // push kids
                jQuery.each(nd.in, function (nId, eId) {
                    var cld = self.graph.nodes[nId];
                    if (!cld) {
                        console.log('Error');
                    }
                    var newCost = nd.cost + self.graph.edges[eId].cost;
                    if (!cld.cost || newCost < cld.cost) {
                        cld.cost = newCost;
                        cld.spEdge = eId; // shortest path edge
                        pQ.push(cld.cost, cld);
                    }
                    
                });
            }
        };
        // the SP is ready
        console.log(self.graph);
    };
    this.graph = graph;
}




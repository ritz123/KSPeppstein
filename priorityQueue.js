// a priority queue
function PriorityQueue () {
    this.swap = function (idx, idx2) {
        var self = this;
        if ((idx === idx2) || !self.data[idx] || !self.data[idx2] )return;
        // swap
        var tmp = self.data[idx2];
        self.data[idx2] = self.data[idx];
        self.data[idx] = tmp; 
    };
    this.push = function (key, obj) {
        // push key, obj to the end of the heap and bubble it upward
        var self = this;
        self.data.push({'priority' : key, 'obj': obj});
        // heapify upward
        var idx = self.data.length - 1;
        if (idx > 0) {
            var idx2 = Math.floor((idx-1)/2);
            while (idx2 >= 0 && self.data[idx2].priority > self.data[idx].priority) {
                // swap
                self.swap(idx, idx2);
                idx = idx2;
                // move up the heap array if required
                idx2 = Math.floor((idx-1)/2);
            };
        }
    };
    this.pop = function () {
        // give from the top
        var self = this;
        
        var len = self.data.length
        if (!len) {
            return null;
        } else if (len === 1) {
            return self.data.pop().obj;
        }
        self.swap(0, len -1)
        var ret = self.data.pop().obj;
        // heapify downward
        var idx = 0;
        var lf = 2*idx + 1;
        var rt = lf + 1;
        while (true) {
            // rt cld present
            if (rt >= self.data.length) {
                // lf cld present
                if (lf >= self.data.length) {
                    // no child is present
                    break;
                } else {
                    // only lf cld present
                    // swap
                    self.swap(idx, lf);
                    break;
                }
            } else {
                // both cld present
                if (self.data[lf].priority < self.data[rt].priority) {
                    // left smaller
                    // swap
                    self.swap(idx, lf);
                    idx = lf;
                    // move up the heap array if required
                    lf = 2*idx + 1;
                    rt = lf + 1;
                } else {
                    // right smaller
                    // swap
                    self.swap(idx, rt);
                    idx = rt;
                    // move up the heap array if required
                    rt = 2*idx + 2;
                    lf = rt - 1;
                }
            }
        }; 
        return ret;
    };
    this.data = [];
}
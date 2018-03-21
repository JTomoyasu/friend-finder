var friends = require("../data/friends.js");

module.exports = function (app) {
    app.get("/api/friends", function (req, res) {
        res.json(friends);
    });
    app.post("/api/friends", function (req, res) {
        var user=req.body;
        var minDifference=2000;
        var minIndex;
        for(i=0;i<friends.length;i++){
            var currentFriend=friends[i];
            var totalDifference=0;
            for(j=0;j<currentFriend.scores.length;j++){
                var friendAns=currentFriend.scores[j];
                var userAns=user.scores[j];
                if(isNaN(friendAns)){
                    if(friendAns.length>2){
                        friendAns=friendAns.substring(0,friendAns.indexOf("S"));
                        friendAns.trim();
                    }      
                }
                if(isNaN(userAns)){
                    if(userAns.length>2){
                        userAns=userAns.substring(0,userAns.indexOf("S"));
                        userAns.trim();
                    }      
                }
                totalDifference+=Math.abs(parseInt(friendAns)-parseInt(userAns));
            }
            if(totalDifference<minDifference){
                minDifference=totalDifference;
                minIndex=i;
            }
        }
        friends.push(req.body);
        res.json(friends[minIndex]);
    });
};
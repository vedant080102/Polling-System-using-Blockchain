pragma solidity >=0.7.0 <0.9.0;

contract PollFactory{

    struct PollData {
        string name;
        address pollAddress;
    }

    PollData[] public deployedPolls;
    
    mapping(address => PollData) public allPolls;

    function createPoll(string[] memory options, string memory name) public{
        
        PollData memory newPoll = PollData({
            name: name,
            pollAddress: address(new Poll(options, msg.sender))
        });

        deployedPolls.push(newPoll);
                
        allPolls[msg.sender] = newPoll;
    }

    function getDeployedPolls() public view returns(PollData memory){
        return allPolls[msg.sender];
    }
}


contract Poll{
    address private manager;
    address[] public voters;
    string[] public candidateList;
    
    mapping(string => int) public candidate;

    constructor (string[] memory options, address sender) public {
        manager = sender;

        candidateList = options;
        for (uint i = 0; i < options.length; i++) {
            candidate[options[i]] = 0;
            // candidateList.push(ttt[i]);
        }
    }

    function getVoters () public view returns ( address[] memory){
        return  voters;
    }

    function enter(string memory a) public {
        require(exists1(msg.sender));

        candidate[a] = candidate[a] + 1;

        voters.push(msg.sender);
    }

    function exists1(address num) public view returns (bool) {
        for (uint i = 0; i < voters.length; i++) {
            if (voters[i] == num) {
                return false;
            }
        }
        return true;
    }

    function pickWinner() public view returns(string memory) {
        require(msg.sender == manager);

        int max = -1;
        uint winnerInd;

        for (uint i = 0; i < candidateList.length; i++) {
            if (candidate[candidateList[i]] > max) {
                max = candidate[candidateList[i]];
                winnerInd = i;
            }
        }
        return candidateList[winnerInd];
    }
}

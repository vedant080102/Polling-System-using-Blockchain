pragma solidity >=0.7.0 <0.9.0;

contract PollFactory{

    struct PollData {
        string name;
        address pollAddress;
    }

    PollData[] public deployedPolls;
    
    mapping(address => PollData) public allPolls;

    function createPoll(string[] memory options, string memory name, string memory question, string memory deadline) public{
        
        PollData memory newPoll = PollData({
            name: name,
            pollAddress: address(new Poll(question, options, msg.sender, deadline))
        });

        deployedPolls.push(newPoll);
                
        allPolls[msg.sender] = newPoll;
    }

    function getMyDeployedPolls() public view returns(PollData memory){
        return allPolls[msg.sender];
    }

    function getAllPolls() public view returns (PollData[] memory) {
        return deployedPolls;
    }

    // function getBy
}


contract Poll{
    address private manager;
    address[] public voters;
    string[] public candidateList;
    string public deadline;
    // int[] votes;

    string question;

    struct PollData {
        string question;
        string[] options;
    }
    
    mapping(string => int) public candidate;

    constructor (string memory quest, string[] memory options, address sender, string memory time) public {
        manager = sender;

        deadline = time;

        candidateList = options;
        for (uint i = 0; i < options.length; i++) {
            candidate[options[i]] = 0;
            // candidateList.push(ttt[i]);
        }
        question = quest;
    }

    function getQuestion() public view returns (PollData memory) {
        return PollData({
            question: question,
            options: candidateList
        });
    }

    function getDeadline() public view returns (string memory) {
        return deadline;
    }

    function getVoters() public view returns ( address[] memory){
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

    function checkIfManager() public view returns (bool) {
        return (msg.sender == manager);
    }

    function getResult() public view returns (int[] memory) {
        require(msg.sender == manager);

        int[] memory votes = new int[](candidateList.length);

        for (uint i = 0; i < candidateList.length; i++) {
            votes[i] = candidate[candidateList[i]];
        }

        return votes;
    }

    function pickWinner() public view returns (string memory) {
        require(msg.sender == manager);

        int max = -1;
        uint winnerInd;
        // uint locWinner;
        // string[] memory temp = candidateList;
        // string[] memory rank;

        for (uint i = 0; i < candidateList.length; i++) {
            if (candidate[candidateList[i]] > max) {
                max = candidate[candidateList[i]];
                winnerInd = i;
            }
        }

        // max = -1;
        // for (uint i = 0; i < candidateList.length; i++) {
        //     for (uint j = 0; j < temp.length; j++) {
        //         if (candidate[candidateList[j]] > max) {
        //             max = candidate[candidateList[i]];
        //             locWinner = j;
        //         }
        //     }
        // }

        return candidateList[winnerInd];
    }

    // function _burn(uint index, string[] storage array) internal {
    //     require(index < array.length);
    //     array[index] = array[array.length-1];
    //     array.pop();
    // }
}

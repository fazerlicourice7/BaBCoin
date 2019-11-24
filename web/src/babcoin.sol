pragma solidity 0.5.12;

contract BaBCoin {

    struct CalEvent { // mapping of ical hash to amount of coin in the pool for that event. PUT ICAL ON CHAIN?
        string icalHash;
        uint minStakeAmount; //stake for the reply "maybe"
        uint poolAmount;
        mapping (address => uint) amountRedistributed;
        mapping (address => uint) amountStaked;
    }

    mapping (address => uint) balances;
    mapping (address => mapping(address => uint)) _allowance; // change this to direct transfer to contract, but allow changing rsvp up to 24 hours before.
    mapping (string => CalEvent) events;

    uint256 private _initSupply;
    uint256 private _minCoin = 1;
    address _exec;

    constructor(uint256 initialSupply) public {
        _totalSupply = initialSupply;
        balances[msg.sender] = _totalSupply;
        _exec = msg.sender;
    }


    function totalSupply() public view returns (uint256){
        return _totalSupply;
    }

    /**
     * Need to set permissions.
     */

    function balanceOf(address tokenOwner) public view returns (uint){
        require(msg.sender == tokenOwner || msg.sender == _exec);
        return balances[tokenOwner];
    }

    /**
     * Exec board (this contract) will most likely be the delegate that will have approval to transact with the babcoin.
     */
    function allowance(address tokenOwner, address spender) public view returns (uint){
        require(msg.sender == tokenOwner); // will exec have authority to give allowances?
        return _allowance[tokenOwner][spender];
    }

    function transfer(address to, uint tokens) public returns (bool) {
        require(balances[address(this)] >= tokens);
        require(balances[to] > 0); // all initialized accounts have >= minCoin BaBCoin.
        balances[address(this)] -= tokens;
        balances[to] += tokens;
        return true; // point of this?
    }

    /**
     * Individuals give this contract access to tokens when they stake on events.
     * This contract then redistributes those coins on the results of the event.
     */
    function approve(address spender, uint tokens)  public returns (bool){
        require(balances[msg.sender] >= tokens);
        require(balances[spender] > 0); // make sure it exists.
        //_allowance[msg.sender][spender] += tokens;
    }
    // what if I have 20 coin, and delegate 15 to one address, and 15 to another address; one spends all 15.

    /**
     *
     */
    function transferFrom(address from, address to, uint tokens) public returns (bool){
        // need require statements here.
        require(balances[from] > tokens);
        require(balances[to] > 0); // make sure it exists.
        balances[from] -= tokens;
        balances[to] += tokens;
        return true;
    }

    /**
     *
     */
    function createEvent(string memory icalHash, uint minStakeAmount) public returns (bool){
        require(balances[_exec] > 0);
        events[icalHash] = CalEvent(icalHash, minStakeAmount, 0);
        events[icalHash].poolAmount += 2*minStakeAmount;
        balances[_exec] -= 2*minStakeAmount;
        return true;
    }

    /**
     *  Exec account always rsvps to an event, but is never marked present. Therefore that stake gets redistributed to the attendees.
     */
    function rsvp(string memory icalHash, uint stakeAmount) public {
        require(balances[msg.sender] > stakeAmount);
        require(stakeAmount >= events[icalHash].minStakeAmount);
        events[icalHash].amountStaked[msg.sender] = stakeAmount;
        events[icalHash].poolAmount += stakeAmount;
        balances[msg.sender] -= stakeAmount;
    }

    /**
     * this will be called from our back end ?which address is this? exec?
     * this is called per person to move any loops out of the solidity code and into the backend
     * returns the final balance of every person
     */
    function eventPayout(string memory icalHash, address person, uint amountToRedistribute) public {
        require(balances[person] > 0);
        require(events[icalHash].poolAmount >= amountToRedistribute);
        events[icalHash].amountRedistributed[person] = amountToRedistribute;
        balances[person] += amountToRedistribute;
        events[icalHash].poolAmount -= amountToRedistribute;
        return balances[person];
        //transferFrom(person, address(this), events[icalHash].amountStaked[person]);
    }
}
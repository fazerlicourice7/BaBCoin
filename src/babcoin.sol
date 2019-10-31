pragma solidity 0.5.12;

import "https://github.com/ethereum/dapp-bin/blob/master/library/stringUtils.sol" as StringUtils;

contract BaBCoin {

    struct CalEvent { // mapping of ical hash to amount of coin in the pool for that event. PUT ICAL ON CHAIN?
        string icalHash;
        address creator;
        uint minStakeAmount; //stake for the reply "maybe"
        uint poolAmount;
        mapping (address => uint) amountRedistributed;
        mapping (address => uint) amountStaked;
    }

    mapping (address => uint) balances;
    mapping (address => mapping(address => uint)) _allowance; // change this to direct transfer to contract, but allow changing rsvp up to 24 hours before.
    mapping (string => CalEvent) events;

    uint256 private _totalSupply;
    uint256 private _minCoin = 1;
    address _exec;

    constructor(uint256 total) public {
        _totalSupply = total;
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
     * Exec board (this contract) will most likely be the delegate that will have approval to transact with the B@BCoin.
     */
    function allowance(address tokenOwner, address spender)   public view returns (uint){
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
        _allowance[msg.sender][spender] += tokens;
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
    function createEvent(address creator, string memory icalHash, uint minStakeAmount) public returns (bool){
        require(balances[creator] > 0);
        events[icalHash] = CalEvent(icalHash, creator, minStakeAmount, 0);
        return true;
    }

    /**
     *  Exec account always rsvps to an event, but is never marked present. Therefore that stake gets redistributed to the attendees.
     */
    function rsvp(string memory icalHashHash, uint stakeAmount) public {
        require(balances[msg.sender] > stakeAmount);
        require(!StringUtils.equals(events[icalHash].icalHash, ""));
        require(stakeAmount >= events[icalHash].minStakeAmount);
        events[icalHash].amountStaked[msg.sender] = stakeAmount;
        events[icalHash].poolAmount += stakeAmount;
    }

    /**
     * this will be called from our back end ?which address is this? exec?
     * this is called per person to move any loops out of the solidity code and into the backend
     */
    function endEvent(string memory icalHash, address person, uint amountToRedistribute) public {
        require(balances[person] > 0);
        require(!StringUtils.equals(events[calendarHash].icalHash, ""));
        events[icalHash].amountRedistributed[person] = amountToRedistribute;
        transferFrom(person, address(this), events[icalHash].amountStaked[person]);
    }


    /**
     * The endEvent function needs to be called for every attendee before this function can be called for anyone.
     * This is so that the contract has a pool of all of the coin that attendees staked.
     *
     * @param person - address of the person who is receiving the payout
     * @param amountToRedistribute - the amount to be payed
     * @returns
     */
    function eventPayout(address person, uint amountToRedistribute) public{
        require(amountToRedistribute <= balances[address(this)]); // make sure total payouts <= balance.
        require(balances[person] > 0);
        transfer(person, amountToRedistribute);
    }


}
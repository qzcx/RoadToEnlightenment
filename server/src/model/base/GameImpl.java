package model.base;

import comm.request.CreateGameRequest;
import model.InjectorFactory;
import model.JsonImpl;
import model.map.MapImpl;
import model.messaging.ChatImpl;
import model.messaging.LogImpl;
import modelInterfaces.base.*;
import modelInterfaces.map.Map;
import modelInterfaces.messaging.Chat;
import modelInterfaces.messaging.Log;
import modelInterfaces.users.User;
import modelInterfaces.base.TradeOffer;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Scanner;

/**
 * Created by: film42 on: 3/6/14.
 */
public class GameImpl extends JsonImpl implements Game {
    private Deck deck;
    private Map map;
    private List<Player> players;
    private Log log;
    private Chat chat;
    private Resources bank;
    private TurnTracker turnTracker;
    private int biggestArmy;
    private int longestRoad;
    private int winner;
    private int revision;
	private TradeOffer tradeOffer;

    public GameImpl(){
        deck = new DeckImpl();
        deck.initBank();

        String mapJson= "";
        try {
            // TODO: Make the model support a model object. Currently only does int. Whoops
            mapJson = new Scanner(new File("MapDefault.json")).useDelimiter("\\Z").next();
            map = fromJson(mapJson, MapImpl.class);
            //ports = map.getPorts();
            //hexGrid = map.getHexGrid();
        } catch (IOException e) {
            e.printStackTrace();
        }

        players = new ArrayList<>();

        log = new LogImpl();

        chat = new ChatImpl();

        bank = new ResourcesImpl();
        bank.initBank();

        turnTracker = new TurnTrackerImpl();

        biggestArmy = 0;
        longestRoad = 0;
        winner = 0;
        revision = 0;
    }

    @Override
    public Deck getDeck() {
        return deck;
    }

    @Override
    public void setDeck(Deck deck) {
        this.deck = deck;
    }

    @Override
    public Map getMap() {
        return map;
    }

    @Override
    public void setMap(Map map) {
        this.map = map;
    }

    @Override
    public List<Player> getPlayers() {
        return players;
    }

    @Override
    public void setPlayers(List<Player> players) {
        this.players = players;
    }

    @Override
    public Log getLog() {
        return log;
    }

    @Override
    public void setLog(Log log) {
        this.log = log;
    }

    @Override
    public Chat getChat() {
        return chat;
    }

    @Override
    public void setChat(Chat chat) {
        this.chat = chat;
    }

    @Override
    public Resources getBank() {
        return bank;
    }

    @Override
    public void setBank(Resources bank) {
        this.bank = bank;
    }

    @Override
    public TurnTracker getTurnTracker() {
        return turnTracker;
    }

    @Override
    public void setTurnTracker(TurnTracker turnTracker) {
        this.turnTracker = turnTracker;
    }

    @Override
    public int getBiggestArmy() {
        return biggestArmy;
    }

    @Override
    public void setBiggestArmy(int biggestArmy) {
        this.biggestArmy = biggestArmy;
    }

    @Override
    public int getLongestRoad() {
        return longestRoad;
    }

    @Override
    public void setLongestRoad(int longestRoad) {
        this.longestRoad = longestRoad;
    }

    @Override
    public int getWinner() {
        return winner;
    }

    @Override
    public void setWinner(int winner) {
        this.winner = winner;
    }

    @Override
    public int getRevision() {
        return revision;
    }

    @Override
    public void setRevision(int revision) {
        this.revision = revision;
    }

    @Override
    public TradeOffer getTradeOffer() {
		return tradeOffer;
    }

    @Override
    public void setTradeOffer(TradeOffer tradeoffer) {
		this.tradeOffer = tradeoffer;
    }



    @Override
    public void initGame(CreateGameRequest createGameRequest) {
        //TODO intilize the Game using the given parameters
        //these parameters need to go to the map.
        map.initMap(createGameRequest);
    }


    /////////////////////////////////////////////////////
    // Sweet Sugar Methods
    /////////////////////////////////////////////////////
    @Override
    public Player getPlayerByIndex(int index) {
        if(index > (players.size() - 1)) return null;
        if(index < 0) return null;

        return this.players.get(index);
    }

    @Override
    public boolean isLastPlayerIndex(int index) {
        return index == (players.size() - 1);
    }

    @Override
    public boolean playersRequireDiscarding() {
        boolean ret = false;
        for(Player player : players) {
            Resources resources = player.getResources();
            // Check each players resource
            if(resources.getResourceCount() > 7){
                // Return true if they need to discard
                player.setDiscarded(false);
                ret = true;
            }else{
                player.setDiscarded(true);
            }
        }

        // Nobody needs to discard
        return ret;
    }

    @Override
    public void addPlayer(User user, String color) {
        for (Player player : players) {
            if(player.getPlayerID() == user.getId()) {
                player.setColor(color);
                return;
            }
        }

        Player newPlayer = InjectorFactory.getInjector().getInstance(Player.class);
        newPlayer.setName(user.getName());
        newPlayer.setPlayerID(user.getId());
        newPlayer.setOrderNumber(players.size());
        newPlayer.setColor(color);
        players.add(newPlayer);
    }

    @Override
    public void incrementUserCounter(int playerIndex) {
        if(isLastPlayerIndex(playerIndex)) {
            turnTracker.setCurrentTurn(0);
        } else {
            turnTracker.setCurrentTurn(turnTracker.getCurrentTurn() + 1);
        }
    }

    @Override
    public void determineLongestRoad() {
        // See if a User currently has Longest Road
        Player longestRoadPlayer = null;
        for(Player player : players) {
            if(player.isLongestRoad()) {
                longestRoadPlayer = player;
                // Assume the player no longer has the longest road
                longestRoadPlayer.setLongestRoad(false);
                longestRoadPlayer.setVictoryPoints(longestRoadPlayer.getVictoryPoints() - 2);
                break;
            }
        }

        // If null, there is no one, so we just find the largest
        if(longestRoadPlayer == null) longestRoadPlayer = getPlayerByIndex(0);

        // Find the new longest road
        for(Player player : players) {
            if(player.getRoadCount() > longestRoadPlayer.getRoadCount()) {
                longestRoadPlayer = player;
            }
        }

        // Is this really the new longest road?
        if(longestRoadPlayer.getRoadCount() >= 5) {
            longestRoadPlayer.setLongestRoad(true);
            longestRoadPlayer.setVictoryPoints(longestRoadPlayer.getVictoryPoints() + 2);
        }
    }

    @Override
    public void determineLargestArmy() {
        // See if a User currently has Longest Road
        Player largestArmyPlayer = null;
        for(Player player : players) {
            if(player.isLargestArmy()) {
                largestArmyPlayer = player;
                // Assume the player no longer has the largest army
                largestArmyPlayer.setLargestArmy(false);
                largestArmyPlayer.setVictoryPoints(largestArmyPlayer.getVictoryPoints() - 2);
                break;
            }
        }

        // If null, there is no one, so we just find the largest
        if(largestArmyPlayer == null) largestArmyPlayer = getPlayerByIndex(0);

        // Find the new largest army
        for(Player player : players) {
            if(player.getSoldiers() > largestArmyPlayer.getSoldiers()) {
                largestArmyPlayer = player;
            }
        }

        // Is this really the new longest road?
        if(largestArmyPlayer.getSoldiers() >= 3) {
            largestArmyPlayer.setLargestArmy(true);
            largestArmyPlayer.setVictoryPoints(largestArmyPlayer.getVictoryPoints() + 2);
        }
    }

    @Override
    public void checkForCompletedGame() {
        for(Player player : players) {
            if(player.getVictoryPoints() >= Catan.MAX_VICTORY_POINTS) {
                setWinner(player.getPlayerID());
            }
        }
    }

}

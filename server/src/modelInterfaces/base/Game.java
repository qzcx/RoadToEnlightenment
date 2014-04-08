package modelInterfaces.base;

import comm.request.CreateGameRequest;
import modelInterfaces.map.Map;
import modelInterfaces.messaging.Chat;
import modelInterfaces.messaging.Log;
import modelInterfaces.users.User;

import java.util.List;

/**
 * Created by Jon George on 3/13/14.
 */
public interface Game {


    Deck getDeck();

    void setDeck(Deck deck);

    Map getMap();

    void setMap(Map map);

    List<Player> getPlayers();

    void setPlayers(List<Player> players);

    Log getLog();

    void setLog(Log log);

    Chat getChat();

    void setChat(Chat chat);

    Resources getBank();

    void setBank(Resources bank);

    TurnTracker getTurnTracker();

    void setTurnTracker(TurnTracker turnTracker);

    int getBiggestArmy();

    void setBiggestArmy(int biggestArmy);

    int getLongestRoad();

    void setLongestRoad(int longestRoad);

    int getWinner();

    void setWinner(int winner);

    int getRevision();

    void setRevision(int revision);

    void setTradeOffer(TradeOffer tradeOffer);

    TradeOffer getTradeOffer();


    void initGame(CreateGameRequest createGameRequest);

    /////////////////////////////////////////////////////
    // Sweet Sugar Methods
    /////////////////////////////////////////////////////
    Player getPlayerByIndex(int index);

    boolean isLastPlayerIndex(int index);

    boolean playersRequireDiscarding();

    void addPlayer(User user, String color);

    public String toJson();

    void incrementUserCounter(int playerIndex);

    void determineLongestRoad();

    void determineLargestArmy();

    void checkForCompletedGame();
}

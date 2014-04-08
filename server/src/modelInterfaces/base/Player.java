package modelInterfaces.base;

/**
 * Created by Jon George on 3/13/14.
 */
public interface Player {
    final int NO_PLAYER = -1;

    Resources getResources();

    void setResources(Resources resources);

    Deck getOldDevCards();

    void setOldDevCards(Deck oldDevCards);

    Deck getNewDevCards();

    void setNewDevCards(Deck newDevCards);

    int getRoads();

    int getRoadCount();

    void setRoads(int roads);

    int getCities();

    void setCities(int cities);

    int getSettlements();

    void setSettlements(int settlements);

    int getSoldiers();

    void setSoldiers(int soldiers);

    int getVictoryPoints();

    void setVictoryPoints(int victoryPoints);

    int getMonuments();

    void setMonuments(int monuments);

    boolean isLongestRoad();

    void setLongestRoad(boolean longestRoad);

    boolean isLargestArmy();

    void setLargestArmy(boolean largestArmy);

    boolean isPlayedDevCard();

    void setPlayedDevCard(boolean playedDevCard);

    boolean hasDiscarded();

    void setDiscarded(boolean discarded);

    int getPlayerID();

    void setPlayerID(int playerID);

    int getOrderNumber();

    void setOrderNumber(int orderNumber);

    String getName();

    void setName(String name);

    String getColor();

    void setColor(String color);

    void addResourceList(Resources resourcesToAdd);


    void buyCity(Resources deck);

    void buySettlement(Resources deck, boolean free);

    void buyRoad(Resources deck,boolean free);

    void buyDevCard(Resources bank);
}

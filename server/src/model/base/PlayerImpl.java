package model.base;

import com.google.inject.Inject;
import model.JsonImpl;
import modelInterfaces.base.Catan;
import modelInterfaces.base.Deck;
import modelInterfaces.base.Resources;

/**
 * Created by: film42 on: 3/7/14.
 */
public class PlayerImpl extends JsonImpl implements modelInterfaces.base.Player {

    private int MAX_GAME_POINTS;
    private Resources resources;
    private Deck oldDevCards;
    private Deck newDevCards;
    private int roads;
    private int cities;
    private int settlements;
    private int soldiers;
    private int victoryPoints;
    private int monuments;
    private boolean longestRoad;
    private boolean largestArmy;
    private boolean playedDevCard;
    private boolean discarded;
    private int playerID;
    private int orderNumber;
    private String name;
    private String color;


    @Inject
    public PlayerImpl(Resources resources, Deck newDeck, Deck oldDeck ) {
        this.MAX_GAME_POINTS = 10;
        this.resources = resources;
        this.oldDevCards = oldDeck;
        this.newDevCards = newDeck;
        this.roads = 15;
        this.cities = 4;
        this.settlements = 5;
        this.soldiers = 0;
        this.victoryPoints = 0;
        this.monuments = 0;
        this.longestRoad = false;
        this.largestArmy = false;
        this.playedDevCard = false;
        this.discarded = false;
        this.playerID = 0;
        this.orderNumber = 0;
        this.name = "Sam";
        this.color = "red";

    }

    @Override
    public Resources getResources() {
        return resources;
    }

    @Override
    public void setResources(Resources resources) {
        this.resources = resources;
    }

    @Override
    public Deck getOldDevCards() {
        return oldDevCards;
    }

    @Override
    public void setOldDevCards(Deck oldDevCards) {
        this.oldDevCards = oldDevCards;
    }

    @Override
    public Deck getNewDevCards() {
        return newDevCards;
    }

    @Override
    public void setNewDevCards(Deck newDevCards) {
        this.newDevCards = newDevCards;
    }

    @Override
    public int getRoads() {
        return roads;
    }

    @Override
    public int getRoadCount() {
        return Catan.MAX_ROAD_COUNT - roads;
    }

    @Override
    public void setRoads(int roads) {
        this.roads = roads;
    }

    @Override
    public int getCities() {
        return cities;
    }

    @Override
    public void setCities(int cities) {
        this.cities = cities;
    }

    @Override
    public int getSettlements() {
        return settlements;
    }

    @Override
    public void setSettlements(int settlements) {
        this.settlements = settlements;
    }

    @Override
    public int getSoldiers() {
        return soldiers;
    }

    @Override
    public void setSoldiers(int soldiers) {
        this.soldiers = soldiers;
    }

    @Override
    public int getVictoryPoints() {
        return victoryPoints;
    }

    @Override
    public void setVictoryPoints(int victoryPoints) {
        this.victoryPoints = victoryPoints;
    }

    @Override
    public int getMonuments() {
        return monuments;
    }

    @Override
    public void setMonuments(int monuments) {
        this.monuments = monuments;
    }

    @Override
    public boolean isLongestRoad() {
        return longestRoad;
    }

    @Override
    public void setLongestRoad(boolean longestRoad) {
        this.longestRoad = longestRoad;
    }

    @Override
    public boolean isLargestArmy() {
        return largestArmy;
    }

    @Override
    public void setLargestArmy(boolean largestArmy) {
        this.largestArmy = largestArmy;
    }

    @Override
    public boolean isPlayedDevCard() {
        return playedDevCard;
    }

    @Override
    public void setPlayedDevCard(boolean playedDevCard) {
        this.playedDevCard = playedDevCard;
    }

    @Override
    public boolean hasDiscarded() {
        return discarded;
    }

    @Override
    public void setDiscarded(boolean discarded) {
        this.discarded = discarded;
    }

    @Override
    public int getPlayerID() {
        return playerID;
    }

    @Override
    public void setPlayerID(int playerID) {
        this.playerID = playerID;
    }

    @Override
    public int getOrderNumber() {
        return orderNumber;
    }

    @Override
    public void setOrderNumber(int orderNumber) {
        this.orderNumber = orderNumber;
    }

    @Override
    public String getName() {
        return name;
    }

    @Override
    public void setName(String name) {
        this.name = name;
    }

    @Override
    public String getColor() {
        return color;
    }

    @Override
    public void setColor(String color) {
        this.color = color;
    }

    @Override
    public void addResourceList(Resources resourcesToAdd) {
        resources.setBrick(resources.getBrick() + resourcesToAdd.getBrick());
        resources.setOre(resources.getOre() + resourcesToAdd.getOre());
        resources.setSheep(resources.getSheep() + resourcesToAdd.getSheep());
        resources.setWheat(resources.getWheat() + resourcesToAdd.getWheat());
        resources.setWood(resources.getWood()  + resourcesToAdd.getWood());
    }

    @Override
    public void buyCity(Resources bank) {
        resources.decrementResourceByString(resources.ORE, 3);
        resources.decrementResourceByString(resources.WHEAT, 2);
        bank.incrementResourceByString(resources.ORE, 3);
        bank.incrementResourceByString(resources.WHEAT, 2);
        cities--;
        settlements++;
        victoryPoints++;
    }

    @Override
    public void buySettlement(Resources bank, boolean free) {
        if(!free){
            resources.decrementResourceByString(resources.BRICK, 1);
            resources.decrementResourceByString(resources.WOOD, 1);
            resources.decrementResourceByString(resources.SHEEP, 1);
            resources.decrementResourceByString(resources.WHEAT, 1);
            bank.incrementResourceByString(resources.BRICK, 1);
            bank.incrementResourceByString(resources.WOOD, 1);
            bank.incrementResourceByString(resources.SHEEP, 1);
            bank.incrementResourceByString(resources.WHEAT, 1);
        }
        victoryPoints++;
        settlements--;
    }

    @Override
    public void buyRoad(Resources bank, boolean free) {
        if(!free){
            resources.decrementResourceByString(resources.BRICK, 1);
            resources.decrementResourceByString(resources.WOOD, 1);
            bank.incrementResourceByString(resources.BRICK, 1);
            bank.incrementResourceByString(resources.WOOD, 1);
        }
        roads--;
    }

    @Override
    public void buyDevCard(Resources bank){
        resources.decrementResourceByString(resources.ORE, 1);
        resources.decrementResourceByString(resources.SHEEP, 1);
        resources.decrementResourceByString(resources.WHEAT, 1);

        bank.incrementResourceByString(resources.ORE, 1);
        bank.incrementResourceByString(resources.SHEEP, 1);
        bank.incrementResourceByString(resources.WHEAT, 1);
    }

   }
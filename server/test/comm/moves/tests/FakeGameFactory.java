package comm.moves.tests;

import java.util.ArrayList;

import model.InjectorFactory;
import model.ModelModule;
import model.base.DeckImpl;
import model.base.GameImpl;
import model.base.ResourcesImpl;
import model.base.TradeOfferImpl;
import modelInterfaces.base.Deck;
import modelInterfaces.base.Game;
import modelInterfaces.base.Player;
import modelInterfaces.base.Resources;

import com.google.inject.Injector;

/**
 * This is a static class that generates a bunch of fake data that we can run test cases on
 * 
 */
public class FakeGameFactory {

	public static final int HIGH_NUMBER = 99;
	public static final int LOW_NUMBER = 0;
	public static final int FIRST_PLAYER = 0;
	public static final int SECOND_PLAYER = 1;
	public static final int THIRD_PLAYER = 2;
	public static final int FOURTH_PLAYER = 3;

	private static Injector injector = InjectorFactory.createInjector(new ModelModule());

	static public Game getNormalFakeGame() {

		Player richMike = createRichPlayer("RichMike", "Red", FIRST_PLAYER);
		Player richJohn = createRichPlayer("RichJohn", "Blue", SECOND_PLAYER);
		Player poorMark = createPoorPlayer("PoorMark", "Green", THIRD_PLAYER);
		Player poorUser = createPoorPlayer("PoorUser", "Orange", FOURTH_PLAYER);

		ArrayList<Player> fakePlayers = new ArrayList<Player>();
		fakePlayers.add(richMike);
		fakePlayers.add(richJohn);
		fakePlayers.add(poorMark);
		fakePlayers.add(poorUser);

		Game fakeGame = new GameImpl();
		fakeGame.setPlayers(fakePlayers);

		// set the tradeOffer to empty (the test cases should set it up every time)
		fakeGame.setTradeOffer(new TradeOfferImpl());

		fakeGame.setDeck(createFullDeck());
		fakeGame.setBank(createFullBank());

		return fakeGame;
	}

	static public Game getWealthyFakeGame() {

		Player richMike = createRichPlayer("RichMike", "Red", FIRST_PLAYER);
		Player richJohn = createRichPlayer("RichJohn", "Blue", SECOND_PLAYER);
		Player richMark = createRichPlayer("RichMark", "Green", THIRD_PLAYER);
		Player richUser = createRichPlayer("RichUser", "Orange", FOURTH_PLAYER);

		ArrayList<Player> fakePlayers = new ArrayList<Player>();
		fakePlayers.add(richMike);
		fakePlayers.add(richJohn);
		fakePlayers.add(richMark);
		fakePlayers.add(richUser);

		Game fakeGame = new GameImpl();
		fakeGame.setPlayers(fakePlayers);

		// set the tradeOffer to empty (the test cases should set it up every time)
		fakeGame.setTradeOffer(new TradeOfferImpl());

		fakeGame.setDeck(createFullDeck());
		fakeGame.setBank(createFullBank());

		return fakeGame;
	}

	private static Deck createFullDeck() {
		Deck deck = new DeckImpl();

		deck.setMonopoly(HIGH_NUMBER);
		deck.setMonument(HIGH_NUMBER);
		deck.setRoadBuilding(HIGH_NUMBER);
		deck.setSoldier(HIGH_NUMBER);
		deck.setYearOfPlenty(HIGH_NUMBER);

		return deck;
	}

	private static Resources createFullBank() {
		Resources resources = new ResourcesImpl();

		resources.setBrick(HIGH_NUMBER);
		resources.setOre(HIGH_NUMBER);
		resources.setSheep(HIGH_NUMBER);
		resources.setWheat(HIGH_NUMBER);
		resources.setWood(HIGH_NUMBER);

		return resources;
	}

	static public Game getPoorFakeGame() {

		Player poorMike = createPoorPlayer("PoorMike", "Red", FIRST_PLAYER);
		Player poorJohn = createPoorPlayer("PoorJohn", "Blue", SECOND_PLAYER);
		Player poorMark = createPoorPlayer("PoorMark", "Green", THIRD_PLAYER);
		Player poorUser = createPoorPlayer("PoorUser", "Orange", FOURTH_PLAYER);

		ArrayList<Player> fakePlayers = new ArrayList<Player>();
		fakePlayers.add(poorMike);
		fakePlayers.add(poorJohn);
		fakePlayers.add(poorMark);
		fakePlayers.add(poorUser);

		Game fakeGame = new GameImpl();
		fakeGame.setPlayers(fakePlayers);

		// set the tradeOffer to empty (the test cases should set it up every time)
		fakeGame.setTradeOffer(new TradeOfferImpl());

		fakeGame.setDeck(createFullDeck());
		fakeGame.setBank(createFullBank());

		return fakeGame;
	}

	private static Player createRichPlayer(String name, String color, int playerIDandOrderNumber) {
		// Rich Mike
		Resources richMikesResources = new model.base.ResourcesImpl();
		richMikesResources.setBrick(HIGH_NUMBER);
		richMikesResources.setOre(HIGH_NUMBER);
		richMikesResources.setSheep(HIGH_NUMBER);
		richMikesResources.setWheat(HIGH_NUMBER);
		richMikesResources.setWood(HIGH_NUMBER);

		Deck richMikesDevCards = new DeckImpl();
		richMikesDevCards.setMonopoly(HIGH_NUMBER);
		richMikesDevCards.setMonument(HIGH_NUMBER);
		richMikesDevCards.setRoadBuilding(HIGH_NUMBER);
		richMikesDevCards.setSoldier(HIGH_NUMBER);
		richMikesDevCards.setYearOfPlenty(HIGH_NUMBER);

		Player richMike = injector.getInstance(Player.class);
		richMike.setResources(richMikesResources);
		richMike.setOldDevCards(richMikesDevCards);
		richMike.setNewDevCards(richMikesDevCards);
		richMike.setRoads(HIGH_NUMBER);
		richMike.setCities(HIGH_NUMBER);
		richMike.setSettlements(HIGH_NUMBER);
		richMike.setSoldiers(HIGH_NUMBER);
		richMike.setVictoryPoints(HIGH_NUMBER);
		richMike.setMonuments(HIGH_NUMBER);
		richMike.setLongestRoad(true);
		richMike.setLargestArmy(true);
		richMike.setPlayedDevCard(true);
		richMike.setDiscarded(true);
		richMike.setPlayerID(playerIDandOrderNumber);
		richMike.setOrderNumber(playerIDandOrderNumber);
		richMike.setName(name);
		richMike.setColor(color);

		return richMike;
	}

	private static Player createPoorPlayer(String name, String color, int playerIDandOrderNumber) {

		// Poor Guy
		Resources poorGuysResources = new model.base.ResourcesImpl();
		poorGuysResources.setBrick(LOW_NUMBER);
		poorGuysResources.setOre(LOW_NUMBER);
		poorGuysResources.setSheep(LOW_NUMBER);
		poorGuysResources.setWheat(LOW_NUMBER);
		poorGuysResources.setWood(LOW_NUMBER);

		Deck poorGuysDevCards = new DeckImpl();
		poorGuysDevCards.setMonopoly(LOW_NUMBER);
		poorGuysDevCards.setMonument(LOW_NUMBER);
		poorGuysDevCards.setRoadBuilding(LOW_NUMBER);
		poorGuysDevCards.setSoldier(LOW_NUMBER);
		poorGuysDevCards.setYearOfPlenty(LOW_NUMBER);

		Player poorPoorGuy = injector.getInstance(Player.class);
		poorPoorGuy.setResources(poorGuysResources);
		poorPoorGuy.setOldDevCards(poorGuysDevCards);
		poorPoorGuy.setNewDevCards(poorGuysDevCards);
		poorPoorGuy.setRoads(LOW_NUMBER);
		poorPoorGuy.setCities(LOW_NUMBER);
		poorPoorGuy.setSettlements(LOW_NUMBER);
		poorPoorGuy.setSoldiers(LOW_NUMBER);
		poorPoorGuy.setVictoryPoints(LOW_NUMBER);
		poorPoorGuy.setMonuments(LOW_NUMBER);
		poorPoorGuy.setLongestRoad(false);
		poorPoorGuy.setLargestArmy(false);
		poorPoorGuy.setPlayedDevCard(false);
		poorPoorGuy.setDiscarded(false);
		poorPoorGuy.setPlayerID(playerIDandOrderNumber);
		poorPoorGuy.setOrderNumber(playerIDandOrderNumber);
		poorPoorGuy.setName(name);
		poorPoorGuy.setColor(color);

		return poorPoorGuy;
	}
}

package comm.moves.tests;

import static comm.moves.base.Command.moveFromJson;
import static comm.moves.tests.FakeGameFactory.*;
import static org.junit.Assert.assertEquals;
import static org.junit.Assert.fail;

import java.io.IOException;

import model.base.DeckImpl;
import model.base.GameInfoImpl;
import modelInterfaces.base.Deck;
import modelInterfaces.base.Game;
import modelInterfaces.base.GameInfo;

import org.junit.Before;
import org.junit.Test;

import comm.moves.BuyDevCard;
import comm.moves.base.Commandable;
import comm.moves.base.InvalidCommandException;

public class BuyDevCardTest {

	private Game fakeWealthyGame;

	@Before
	public void setUp() throws Exception {
		fakeWealthyGame = FakeGameFactory.getWealthyFakeGame();

		// Let's have our rich user (who can afford stuff) not have any dev cards to start
		fakeWealthyGame.getPlayerByIndex(FOURTH_PLAYER).getNewDevCards().setMonopoly(LOW_NUMBER);
		fakeWealthyGame.getPlayerByIndex(FOURTH_PLAYER).getNewDevCards().setMonument(LOW_NUMBER);
		fakeWealthyGame.getPlayerByIndex(FOURTH_PLAYER).getNewDevCards().setRoadBuilding(LOW_NUMBER);
		fakeWealthyGame.getPlayerByIndex(FOURTH_PLAYER).getNewDevCards().setSoldier(LOW_NUMBER);
		fakeWealthyGame.getPlayerByIndex(FOURTH_PLAYER).getNewDevCards().setYearOfPlenty(LOW_NUMBER);

	}

	@Test
	public void testIt() {
		// Setup
		GameInfo fakeInfo = new GameInfoImpl(fakeWealthyGame);
		String json = "{\"type\" : \"buyDevCard\", \"playerIndex\": " + FOURTH_PLAYER + "}";
		// Create object
		Commandable buyDevCard = moveFromJson(json, BuyDevCard.class);

		// Execute command
		try {
			buyDevCard.execute(fakeInfo);
		} catch (IOException | InvalidCommandException e) {
			fail("Exception in .execute();");
			return;
		}

		assertEquals(LOW_NUMBER + 1, fakeInfo.getData().getPlayerByIndex(FOURTH_PLAYER).getNewDevCards().getDeckCount());
	}

	@Test
	public void testForWhenDeckHasNoCards() {
		// Setup
		Deck deck = new DeckImpl();

		deck.setMonopoly(LOW_NUMBER);
		deck.setMonument(LOW_NUMBER);
		deck.setRoadBuilding(LOW_NUMBER);
		deck.setSoldier(LOW_NUMBER);
		deck.setYearOfPlenty(LOW_NUMBER);

		fakeWealthyGame.setDeck(deck);

		GameInfo fakeInfo = new GameInfoImpl(fakeWealthyGame);

		String json = "{\"type\" : \"buyDevCard\", \"playerIndex\": " + FOURTH_PLAYER + "}";
		// Create object
		Commandable buyDevCard = moveFromJson(json, BuyDevCard.class);

		// Execute command
		try {
			buyDevCard.execute(fakeInfo);
		} catch (IOException | InvalidCommandException e) {
			fail("Exception in .execute();");
			return;
		}

		// Check to make sure that the user didn't get anything because the deck had nothing
		assertEquals(LOW_NUMBER, fakeInfo.getData().getPlayerByIndex(FOURTH_PLAYER).getNewDevCards().getDeckCount());
	}

}

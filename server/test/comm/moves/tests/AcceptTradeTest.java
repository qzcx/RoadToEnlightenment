package comm.moves.tests;

import static comm.moves.base.Command.moveFromJson;
import static comm.moves.tests.FakeGameFactory.*;
import static org.junit.Assert.*;

import java.io.IOException;

import model.base.GameInfoImpl;
import model.base.ResourcesImpl;
import modelInterfaces.base.Game;
import modelInterfaces.base.GameInfo;
import modelInterfaces.base.Resources;
import modelInterfaces.base.TradeOffer;

import org.junit.Before;
import org.junit.Test;

import comm.moves.AcceptTrade;
import comm.moves.base.Commandable;
import comm.moves.base.InvalidCommandException;

public class AcceptTradeTest {

	private Game fakeWealthyGame;

	@Before
	public void setUp() throws Exception {
		fakeWealthyGame = FakeGameFactory.getWealthyFakeGame();
	}

	@Test
	public void testAccept() {
		// Setup
		GameInfo fakeInfo = new GameInfoImpl(fakeWealthyGame);
		String json = "{\"type\" : \"acceptTrade\", \"playerIndex\": " + FOURTH_PLAYER + ", \"willAccept\": true }";

		// Setup Trade Offer: The user(fourth player) is offering 1 ore for 1 brick to first player
		TradeOffer tradeOffer = fakeWealthyGame.getTradeOffer();
		tradeOffer.setReceiver(FIRST_PLAYER);
		tradeOffer.setSender(FOURTH_PLAYER);
		Resources resources = new ResourcesImpl();
		resources.setBrick(-1);
		resources.setOre(1);
		tradeOffer.setResourceOffer(resources);

		// Alter the game a little bit
		Game gameWithTradeOffer = fakeInfo.getData();
		gameWithTradeOffer.setTradeOffer(tradeOffer);
		fakeInfo.setData(gameWithTradeOffer);

		// Create object
		Commandable acceptTrade = moveFromJson(json, AcceptTrade.class);

		// Execute command
		try {
			acceptTrade.execute(fakeInfo);
		} catch (IOException | InvalidCommandException e) {
			fail("Exception in .execute();");
			return;
		}

		// Make sure First Player lost a brick and got an ore
		assertEquals(HIGH_NUMBER - 1, fakeInfo.getData().getPlayerByIndex(FIRST_PLAYER).getResources().getBrick());
		assertEquals(HIGH_NUMBER + 1, fakeInfo.getData().getPlayerByIndex(FIRST_PLAYER).getResources().getOre());

		// Make sure Fourth Player lost a brick and got an ore
		assertEquals(HIGH_NUMBER - 1, fakeInfo.getData().getPlayerByIndex(FOURTH_PLAYER).getResources().getOre());
		assertEquals(HIGH_NUMBER + 1, fakeInfo.getData().getPlayerByIndex(FOURTH_PLAYER).getResources().getBrick());

		assertEquals(null, fakeInfo.getData().getTradeOffer());
	}

	@Test
	public void testDecline() {
		// Setup
		GameInfo fakeInfo = new GameInfoImpl(fakeWealthyGame);
		String json = "{\"type\" : \"acceptTrade\", \"playerIndex\": " + FOURTH_PLAYER + ", \"willAccept\": false }";

		// Setup Trade Offer: The user(fourth player) is offering 1 ore for 1 brick to first player
		TradeOffer tradeOffer = fakeWealthyGame.getTradeOffer();
		tradeOffer.setReceiver(FIRST_PLAYER);
		tradeOffer.setSender(FOURTH_PLAYER);
		Resources resources = new ResourcesImpl();
		resources.setBrick(-1);
		resources.setOre(1);
		tradeOffer.setResourceOffer(resources);

		// Alter the game object a little bit
		Game gameWithTradeOffer = fakeInfo.getData();
		gameWithTradeOffer.setTradeOffer(tradeOffer);
		fakeInfo.setData(gameWithTradeOffer);

		// Create object
		Commandable acceptTrade = moveFromJson(json, AcceptTrade.class);

		// Execute command
		try {
			acceptTrade.execute(fakeInfo);
		} catch (IOException | InvalidCommandException e) {
			fail("Exception in .execute();");
			return;
		}

		// Make sure both players have the same resources as before
		assertEquals(HIGH_NUMBER, fakeInfo.getData().getPlayerByIndex(FIRST_PLAYER).getResources().getBrick());
		assertEquals(HIGH_NUMBER, fakeInfo.getData().getPlayerByIndex(FIRST_PLAYER).getResources().getOre());
		assertEquals(HIGH_NUMBER, fakeInfo.getData().getPlayerByIndex(FOURTH_PLAYER).getResources().getBrick());
		assertEquals(HIGH_NUMBER, fakeInfo.getData().getPlayerByIndex(FOURTH_PLAYER).getResources().getOre());

		assertEquals(null, fakeInfo.getData().getTradeOffer());
	}
}

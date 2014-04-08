package comm.moves.tests;

import static comm.moves.base.Command.moveFromJson;
import static comm.moves.tests.FakeGameFactory.*;
import static org.junit.Assert.*;

import java.io.IOException;

import model.base.GameInfoImpl;
import model.map.LocationImpl;
import modelInterfaces.base.Game;
import modelInterfaces.base.GameInfo;
import modelInterfaces.base.Player;

import org.junit.Before;
import org.junit.Test;

import comm.moves.BuildCity;
import comm.moves.base.Commandable;
import comm.moves.base.InvalidCommandException;

public class BuildCityTest {

	private Game fakeWealthyGame;
	private Game fakeNormalGame;

	@Before
	public void setUp() throws Exception {
		fakeWealthyGame = FakeGameFactory.getWealthyFakeGame();
		fakeNormalGame = FakeGameFactory.getNormalFakeGame();
	}

	@Test
	public void testInNormalMode() {
		// Setup
		GameInfo fakeInfo = new GameInfoImpl(fakeWealthyGame);
		String json = "{\"type\" : \"buildCity\", \"playerIndex\": " + FOURTH_PLAYER
				+ ", \"vertexLocation\": { x: 1, y: 2, direction: \"NE\"}, free: false}";

		// Create object
		Commandable buildCity = moveFromJson(json, BuildCity.class);

		// Execute command
		try {
			buildCity.execute(fakeInfo);
		} catch (IOException | InvalidCommandException e) {
			fail("Exception in .execute();");
			return;
		}

		Game game = fakeInfo.getData();
		Player user = game.getPlayerByIndex(FOURTH_PLAYER);

		// Test to make sure they were charged
		assertEquals(HIGH_NUMBER - 1, user.getCities());
		assertEquals(HIGH_NUMBER - 3, user.getResources().getOre());
		assertEquals(HIGH_NUMBER - 2, user.getResources().getWheat());

		// test to make sure it's on the map
		assertEquals(2, game.getMap().getHexGrid().getHex(new LocationImpl(1, 2)).getVertex(2).getValue().getWorth());

		// test to make sure we own it
		assertEquals(FOURTH_PLAYER, game.getMap().getHexGrid().getHex(new LocationImpl(1, 2)).getVertex(2).getValue().getOwnerID());
	}

	@Test
	public void testInNormalModeButHasNoCitiesLeft() {
		// Setup
		GameInfo fakeInfo = new GameInfoImpl(fakeNormalGame);
		String json = "{\"type\" : \"buildCity\", \"playerIndex\": " + FOURTH_PLAYER
				+ ", \"vertexLocation\": { x: 1, y: 2, direction: \"NE\"}, free: false}";

		// Create object
		Commandable buildCity = moveFromJson(json, BuildCity.class);

		// Execute command
		try {
			buildCity.execute(fakeInfo);
		} catch (IOException | InvalidCommandException e) {
			assertTrue(true);
			return;
		}
		fail("No exception thrown.  User had no cities left!");
	}

	/**
	 * Not a valid test (for now)
	 */
	public void testInNormalModeButHasNoResourcesForIt() {
		// Setup
		GameInfo fakeInfo = new GameInfoImpl(fakeNormalGame);
		fakeInfo.getData().getPlayerByIndex(FOURTH_PLAYER).setCities(20);
		String json = "{\"type\" : \"buildCity\", \"playerIndex\": " + FOURTH_PLAYER
				+ ", \"vertexLocation\": { x: 1, y: 2, direction: \"NE\"}, free: false}";

		// Create object
		Commandable buildCity = moveFromJson(json, BuildCity.class);

		// Execute command
		try {
			buildCity.execute(fakeInfo);
		} catch (IOException | InvalidCommandException e) {
			assertTrue(true);
			return;
		}
		fail("No exception thrown.  User had no resources!");
	}
}

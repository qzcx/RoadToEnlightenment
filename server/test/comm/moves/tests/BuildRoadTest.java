package comm.moves.tests;

import static comm.moves.base.Command.moveFromJson;
import static comm.moves.tests.FakeGameFactory.FOURTH_PLAYER;
import static comm.moves.tests.FakeGameFactory.HIGH_NUMBER;
import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertTrue;
import static org.junit.Assert.fail;

import java.io.IOException;

import model.base.GameInfoImpl;
import model.map.LocationImpl;
import modelInterfaces.base.Game;
import modelInterfaces.base.GameInfo;
import modelInterfaces.base.Player;

import org.junit.Before;
import org.junit.Test;

import comm.moves.BuildRoad;
import comm.moves.base.Commandable;
import comm.moves.base.InvalidCommandException;

public class BuildRoadTest {

	private Game fakeWealthyGame;
	private Game fakeNormalGame;

	@Before
	public void setUp() throws Exception {
		fakeWealthyGame = FakeGameFactory.getWealthyFakeGame();
		fakeNormalGame = FakeGameFactory.getNormalFakeGame();
	}

	@Test
	public void testInSetupMode() {
		// Setup
		GameInfo fakeInfo = new GameInfoImpl(fakeWealthyGame);
		String json = "{\"type\" : \"buildRoad\", \"playerIndex\": " + FOURTH_PLAYER
				+ ", \"roadLocation\": { x: 1, y: 2, direction: \"NE\"}, free: true}";

		// Create object
		Commandable buildRoad = moveFromJson(json, BuildRoad.class);

		// Execute command
		try {
			buildRoad.execute(fakeInfo);
		} catch (IOException | InvalidCommandException e) {
			fail("Exception in .execute();");
			return;
		}

		Game game = fakeInfo.getData();
		Player user = game.getPlayerByIndex(FOURTH_PLAYER);

		// make sure their count was decremented
		assertEquals(HIGH_NUMBER - 1, user.getRoads());

		// Test to make sure they weren't charged because it's still in setup round
		assertEquals(HIGH_NUMBER, user.getResources().getBrick());
		assertEquals(HIGH_NUMBER, user.getResources().getWood());

		// test to make sure it's on the map and make sure we own it
		assertEquals(FOURTH_PLAYER, game.getMap().getHexGrid().getHex(new LocationImpl(1, 2)).getEdge(2).getValue().getOwnerID());
	}

	@Test
	public void testInNormalMode() {
		// Setup
		GameInfo fakeInfo = new GameInfoImpl(fakeWealthyGame);
		String json = "{\"type\" : \"buildRoad\", \"playerIndex\": " + FOURTH_PLAYER
				+ ", \"roadLocation\": { x: 1, y: 2, direction: \"NE\"}, free: false}";

		// Create object
		Commandable buildRoad = moveFromJson(json, BuildRoad.class);

		// Execute command
		try {
			buildRoad.execute(fakeInfo);
		} catch (IOException | InvalidCommandException e) {
			fail("Exception in .execute();");
			return;
		}

		Game game = fakeInfo.getData();
		Player user = game.getPlayerByIndex(FOURTH_PLAYER);

		// Test to make sure they were charged
		assertEquals(HIGH_NUMBER - 1, user.getRoads());
		assertEquals(HIGH_NUMBER - 1, user.getResources().getBrick());
		assertEquals(HIGH_NUMBER - 1, user.getResources().getWood());

		// test to make sure it's on the map and make sure we own it
		assertEquals(FOURTH_PLAYER, game.getMap().getHexGrid().getHex(new LocationImpl(1, 2)).getEdge(2).getValue().getOwnerID());

	}

	@Test
	public void testInNormalModeButHasNoRoadsLeft() {
		// Setup
		GameInfo fakeInfo = new GameInfoImpl(fakeNormalGame);
		String json = "{\"type\" : \"buildRoad\", \"playerIndex\": " + FOURTH_PLAYER
				+ ", \"roadLocation\": { x: 1, y: 2, direction: \"NE\"}, free: false}";

		// Create object
		Commandable buildRoad = moveFromJson(json, BuildRoad.class);

		// Execute command
		try {
			buildRoad.execute(fakeInfo);
		} catch (IOException | InvalidCommandException e) {
			assertTrue(true);
			return;
		}
		fail("No exception thrown.  User had no roads left!");
	}

	/**
	 * Not a valid test (for now)
	 */
	public void testInNormalModeButHasNoResourcesForIt() {
		// Setup
		GameInfo fakeInfo = new GameInfoImpl(fakeNormalGame);
		fakeInfo.getData().getPlayerByIndex(FOURTH_PLAYER).setRoads(20);
		String json = "{\"type\" : \"buildRoad\", \"playerIndex\": " + FOURTH_PLAYER
				+ ", \"roadLocation\": { x: 1, y: 2, direction: \"NE\"}, free: false}";

		// Create object
		Commandable buildRoad = moveFromJson(json, BuildRoad.class);

		// Execute command
		try {
			buildRoad.execute(fakeInfo);
		} catch (IOException | InvalidCommandException e) {
			assertTrue(true);
			return;
		}
		fail("No exception thrown.  User had no resources!");
	}
}

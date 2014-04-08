package comm.moves.tests;

import static comm.moves.base.Command.moveFromJson;
import static comm.moves.tests.FakeGameFactory.FIRST_PLAYER;
import static comm.moves.tests.FakeGameFactory.FOURTH_PLAYER;
import static comm.moves.tests.FakeGameFactory.HIGH_NUMBER;
import static comm.moves.tests.FakeGameFactory.LOW_NUMBER;
import static comm.moves.tests.FakeGameFactory.SECOND_PLAYER;
import static comm.moves.tests.FakeGameFactory.THIRD_PLAYER;
import static org.junit.Assert.assertEquals;
import static org.junit.Assert.fail;

import java.io.IOException;

import model.base.GameInfoImpl;
import modelInterfaces.base.Game;
import modelInterfaces.base.GameInfo;
import modelInterfaces.base.Player;

import org.junit.After;
import org.junit.Before;
import org.junit.Test;

import comm.moves.Monopoly;
import comm.moves.base.Commandable;
import comm.moves.base.InvalidCommandException;

/**
 * This has partitioning in it. I test that each resource works when there are two others with the specified resource and one other that does not. I
 * also test the case where nobody has the specified resource and also where everyone has the specified resource.
 * 
 * @author Steve Allred
 * 
 */
public class MonopolyTest {

	private Game fakeNormalGame;
	private Game fakeWealthyGame;
	private Game fakePoorGame;

	@Before
	public void setUp() throws Exception {
		fakeNormalGame = FakeGameFactory.getNormalFakeGame();
		fakeWealthyGame = FakeGameFactory.getWealthyFakeGame();
		fakePoorGame = FakeGameFactory.getPoorFakeGame();
	}

	@Test
	public void testStealWood() {

		// Setup
		GameInfo fakeInfo = new GameInfoImpl(fakeNormalGame);
		String json = "{\"resource\" : \"Wood\", \"playerIndex\": " + FOURTH_PLAYER + "}";

		// Create object
		Commandable monopoly = moveFromJson(json, Monopoly.class);

		// Execute command
		try {
			monopoly.execute(fakeInfo);
		} catch (IOException | InvalidCommandException e) {
			fail("Exception in .execute();");
			return;
		}

		// test that it worked
		for (Player p : fakeInfo.getData().getPlayers()) {
			// test to make sure that those who had a wood lost one
			if (p.getOrderNumber() == FIRST_PLAYER || p.getOrderNumber() == SECOND_PLAYER) {
				assertEquals(HIGH_NUMBER - 1, p.getResources().getWood());
			}
			// test to make sure that those who didn't have anything didn't lose or gain anything
			else if (p.getOrderNumber() == THIRD_PLAYER) {
				assertEquals(LOW_NUMBER, p.getResources().getWood());
			}
			// test to make sure that the user who played the card got the resources
			else if (p.getOrderNumber() == FOURTH_PLAYER) {
				assertEquals(LOW_NUMBER + 2, p.getResources().getWood());
			}
		}
	}

	@Test
	public void testStealOre() {

		// Setup
		GameInfo fakeInfo = new GameInfoImpl(fakeNormalGame);
		String json = "{\"resource\" : \"Ore\", \"playerIndex\": " + FOURTH_PLAYER + "}";

		// Create object
		Commandable monopoly = moveFromJson(json, Monopoly.class);

		// Execute command
		try {
			monopoly.execute(fakeInfo);
		} catch (IOException | InvalidCommandException e) {
			fail("Exception in testStealOre.execute();");
			return;
		}

		// test that it worked
		for (Player p : fakeInfo.getData().getPlayers()) {
			// test to make sure that those who had a ore lost one
			if (p.getOrderNumber() == FIRST_PLAYER || p.getOrderNumber() == SECOND_PLAYER) {
				assertEquals(HIGH_NUMBER - 1, p.getResources().getOre());
			}
			// test to make sure that those who didn't have anything didn't lose or gain anything
			else if (p.getOrderNumber() == THIRD_PLAYER) {
				assertEquals(LOW_NUMBER, p.getResources().getOre());
			}
			// test to make sure that the user who played the card got the resources
			else if (p.getOrderNumber() == FOURTH_PLAYER) {
				assertEquals(LOW_NUMBER + 2, p.getResources().getOre());
			}
		}
	}

	@Test
	public void testStealWheat() {

		// Setup
		GameInfo fakeInfo = new GameInfoImpl(fakeNormalGame);
		String json = "{\"resource\" : \"Wheat\", \"playerIndex\": " + FOURTH_PLAYER + "}";

		// Create object
		Commandable monopoly = moveFromJson(json, Monopoly.class);

		// Execute command
		try {
			monopoly.execute(fakeInfo);
		} catch (IOException | InvalidCommandException e) {
			fail("Exception in testStealWheat.execute();");
			return;
		}

		// test that it worked
		for (Player p : fakeInfo.getData().getPlayers()) {
			// test to make sure that those who had a Wheat lost one
			if (p.getOrderNumber() == FIRST_PLAYER || p.getOrderNumber() == SECOND_PLAYER) {
				assertEquals(HIGH_NUMBER - 1, p.getResources().getWheat());
			}
			// test to make sure that those who didn't have anything didn't lose or gain anything
			else if (p.getOrderNumber() == THIRD_PLAYER) {
				assertEquals(LOW_NUMBER, p.getResources().getWheat());
			}
			// test to make sure that the user who played the card got the resources
			else if (p.getOrderNumber() == FOURTH_PLAYER) {
				assertEquals(LOW_NUMBER + 2, p.getResources().getWheat());
			}
		}
	}

	@Test
	public void testStealSheep() {

		// Setup
		GameInfo fakeInfo = new GameInfoImpl(fakeNormalGame);
		String json = "{\"resource\" : \"Sheep\", \"playerIndex\": " + FOURTH_PLAYER + "}";

		// Create object
		Commandable monopoly = moveFromJson(json, Monopoly.class);

		// Execute command
		try {
			monopoly.execute(fakeInfo);
		} catch (IOException | InvalidCommandException e) {
			fail("Exception in testStealSheep.execute();");
			return;
		}

		// test that it worked
		for (Player p : fakeInfo.getData().getPlayers()) {
			// test to make sure that those who had a Sheep lost one
			if (p.getOrderNumber() == FIRST_PLAYER || p.getOrderNumber() == SECOND_PLAYER) {
				assertEquals(HIGH_NUMBER - 1, p.getResources().getSheep());
			}
			// test to make sure that those who didn't have anything didn't lose or gain anything
			else if (p.getOrderNumber() == THIRD_PLAYER) {
				assertEquals(LOW_NUMBER, p.getResources().getSheep());
			}
			// test to make sure that the user who played the card got the resources
			else if (p.getOrderNumber() == FOURTH_PLAYER) {
				assertEquals(LOW_NUMBER + 2, p.getResources().getSheep());
			}
		}
	}

	@Test
	public void testStealBrick() {

		// Setup
		GameInfo fakeInfo = new GameInfoImpl(fakeNormalGame);
		String json = "{\"resource\" : \"Brick\", \"playerIndex\": " + FOURTH_PLAYER + "}";

		// Create object
		Commandable monopoly = moveFromJson(json, Monopoly.class);

		// Execute command
		try {
			monopoly.execute(fakeInfo);
		} catch (IOException | InvalidCommandException e) {
			fail("Exception in testStealBrick.execute();");
			return;
		}

		// test that it worked
		for (Player p : fakeInfo.getData().getPlayers()) {
			// test to make sure that those who had a Brick lost one
			if (p.getOrderNumber() == FIRST_PLAYER || p.getOrderNumber() == SECOND_PLAYER) {
				assertEquals(HIGH_NUMBER - 1, p.getResources().getBrick());
			}
			// test to make sure that those who didn't have anything didn't lose or gain anything
			else if (p.getOrderNumber() == THIRD_PLAYER) {
				assertEquals(LOW_NUMBER, p.getResources().getBrick());
			}
			// test to make sure that the user who played the card got the resources
			else if (p.getOrderNumber() == FOURTH_PLAYER) {
				assertEquals(LOW_NUMBER + 2, p.getResources().getBrick());
			}
		}
	}

	@Test
	public void testStealWoodButNobodyHasWood() {

		// Setup
		GameInfo fakeInfo = new GameInfoImpl(fakePoorGame);
		String json = "{\"resource\" : \"Wood\", \"playerIndex\": " + FOURTH_PLAYER + "}";

		// Create object
		Commandable monopoly = moveFromJson(json, Monopoly.class);

		// Execute command
		try {
			monopoly.execute(fakeInfo);
		} catch (IOException | InvalidCommandException e) {
			fail("Exception in .execute();");
			return;
		}

		// test that it worked
		for (Player p : fakeInfo.getData().getPlayers()) {
			// Nobody had wood, so everybody should remain at zero
			assertEquals(LOW_NUMBER, p.getResources().getWood());
		}
	}

	@Test
	public void testStealBrickAndEverybodyHasBrick() {

		// Setup
		GameInfo fakeInfo = new GameInfoImpl(fakeWealthyGame);
		String json = "{\"resource\" : \"Brick\", \"playerIndex\": " + FOURTH_PLAYER + "}";

		// Create object
		Commandable monopoly = moveFromJson(json, Monopoly.class);

		// Execute command
		try {
			monopoly.execute(fakeInfo);
		} catch (IOException | InvalidCommandException e) {
			fail("Exception in testStealBrick.execute();");
			return;
		}

		// test that it worked
		for (Player p : fakeInfo.getData().getPlayers()) {
			// test to make sure that those who had a Brick lost one
			if (!(p.getOrderNumber() == FOURTH_PLAYER)) {
				assertEquals(HIGH_NUMBER - 1, p.getResources().getBrick());
			}
			// The user should have received three resources
			else {
				assertEquals(HIGH_NUMBER + 3, p.getResources().getBrick());
			}
		}
	}

	@After
	public void tearDown() throws Exception {

	}
}

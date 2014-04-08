package comm.moves.tests;

import comm.moves.Monument;
import comm.moves.base.Commandable;
import comm.moves.base.InvalidCommandException;
import model.base.GameInfoImpl;
import modelInterfaces.base.Game;
import modelInterfaces.base.GameInfo;
import org.junit.Before;
import org.junit.Test;

import java.io.IOException;

import static comm.moves.base.Command.moveFromJson;
import static comm.moves.tests.FakeGameFactory.FOURTH_PLAYER;
import static comm.moves.tests.FakeGameFactory.LOW_NUMBER;
import static org.junit.Assert.assertEquals;
import static org.junit.Assert.fail;

public class MonumentTest {

	private Game fakeNormalGame;

	@Before
	public void setUp() throws Exception {
		fakeNormalGame = FakeGameFactory.getNormalFakeGame();
	}

	@Test
	public void testIt() {
		// Setup
		GameInfo fakeInfo = new GameInfoImpl(fakeNormalGame);
		String json = "{\"type\" : \"Monument\", \"playerIndex\": " + FOURTH_PLAYER + "}";
		// Create object
		Commandable monument = moveFromJson(json, Monument.class);

		// Execute command
		try {
			monument.execute(fakeInfo);
		} catch (IOException | InvalidCommandException e) {
			fail("Exception in .execute();");
			return;
		}

        // Should fail because we haven't added a monument card yet
		assertEquals(LOW_NUMBER, fakeInfo.getData().getPlayerByIndex(FOURTH_PLAYER).getVictoryPoints());

        // Add a monument card
        assertEquals(0, fakeInfo.getData().getPlayerByIndex(FOURTH_PLAYER).getMonuments());
        fakeInfo.getData().getPlayerByIndex(FOURTH_PLAYER).getNewDevCards().setMonument(1);

        // Can purchase a monument card
        try {
            monument.execute(fakeInfo);
        } catch (IOException | InvalidCommandException e) {
            fail("Exception in .execute();");
            return;
        }
        assertEquals(0, fakeInfo.getData().getPlayerByIndex(FOURTH_PLAYER).getMonuments());
        assertEquals(1, fakeInfo.getData().getPlayerByIndex(FOURTH_PLAYER).getVictoryPoints());

	}
}

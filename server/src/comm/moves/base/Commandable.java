package comm.moves.base;

import modelInterfaces.base.GameInfo;

import java.io.IOException;

/**
 * Created by: film42 on: 3/12/14.
 */
public interface Commandable {

    public void execute(GameInfo gameInfo) throws IOException, InvalidCommandException;

}

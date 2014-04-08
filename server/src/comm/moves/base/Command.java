package comm.moves.base;

import com.google.gson.Gson;
import com.google.gson.JsonSyntaxException;
import model.InjectorFactory;
import model.messaging.LineImpl;
import modelInterfaces.base.GameInfo;
import modelInterfaces.base.Player;
import modelInterfaces.messaging.Line;

import java.io.IOException;

/**
 * Created by: film42 on: 3/12/14.
 */
public abstract class Command implements Commandable {

	protected String type;

	protected int playerIndex;


    public String getType() {
        return type;
    }

    public int getPlayerIndex() {
        return playerIndex;
    }

    public abstract String getLogMessage();

    @Override
    public void execute(GameInfo gameInfo) throws IOException, InvalidCommandException{
        Player p = gameInfo.getData().getPlayerByIndex(getPlayerIndex());
        if(getLogMessage() != null){
            gameInfo.getData().getLog().addLine(new LineImpl(p.getName(), p.getName() + getLogMessage()));
        }
    }

    public static <T extends Command> T moveFromJson(String json, Class<T> type) throws JsonSyntaxException {
        Gson gson = new Gson();
        return type.cast(gson.fromJson(json, type));
    }
}

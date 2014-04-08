package comm.moves;

import comm.moves.base.Command;
import comm.moves.base.InvalidCommandException;
import model.messaging.LineImpl;
import modelInterfaces.base.Game;
import modelInterfaces.base.GameInfo;
import modelInterfaces.messaging.Chat;
import modelInterfaces.messaging.Line;


import java.io.IOException;

/**
 * Created by: film42 on: 3/12/14.
 */
public class SendChat extends Command {

    private String content;

    public String getContent() {
        return content;
    }

    @Override
    public String getLogMessage() {
        return null;
    }

    @Override
    public void execute(GameInfo gameInfo) throws IOException, InvalidCommandException {
        super.execute(gameInfo);
        Game game = gameInfo.getData();

        Chat  chat = game.getChat();

        try {
            String user = game.getPlayerByIndex(playerIndex).getName();
            chat.addLine(new LineImpl(user,content));

            game.setChat(chat);
            gameInfo.setData(game);
        } catch (ArrayIndexOutOfBoundsException e) {
            throw new InvalidCommandException("Bad player index");
        }


    }
}

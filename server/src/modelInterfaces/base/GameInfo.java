package modelInterfaces.base;

import comm.moves.base.Command;
import comm.request.CreateGameRequest;
import modelInterfaces.users.User;

import java.util.List;

/**
 * Created by qzcx on 3/17/14.
 */
public interface GameInfo {
    int getId();

    void setId(int id);

    String getTitle();

    void setTitle(String title);

    Game getData();

    void setData(Game data);

    void initGame(CreateGameRequest createGameRequest);

    void addPlayer(User user, String color);

    List<Command> getCommandList();

    void setCommandList(List<Command> commandList);

    void addCommand(Command command);
}


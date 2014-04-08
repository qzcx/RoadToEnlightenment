package model.base;

import com.google.inject.Inject;
import comm.moves.base.Command;
import comm.request.CreateGameRequest;
import modelInterfaces.base.Game;
import modelInterfaces.users.User;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by qzcx on 3/17/14.
 */
public class GameInfoImpl implements modelInterfaces.base.GameInfo {
    private static int next_id = 0;
    private int id;
    private String title;
    private Game data;
    private List<Command> commandList;

    @Inject
    public GameInfoImpl(Game data) {
        this.id = next_id;
        this.data = data;
        next_id++;
        commandList = new ArrayList<>();
    }

    @Override
    public int getId() {
        return id;
    }

    @Override
    public void setId(int id) {
        this.id = id;
    }

    @Override
    public String getTitle() {
        return title;
    }

    @Override
    public void setTitle(String title) {
        this.title = title;
    }

    @Override
    public Game getData() {
        return data;
    }

    @Override
    public void setData(Game data) {
        this.data = data;
    }

    @Override
    public void initGame(CreateGameRequest createGameRequest){
        this.data.initGame(createGameRequest);
    }

    @Override
    public void addPlayer(User user, String color) {
        this.data.addPlayer(user, color);
    }

    @Override
    public List<Command> getCommandList() {
        return commandList;
    }

    @Override
    public void setCommandList(List<Command> commandList) {
        this.commandList = commandList;
    }

    @Override
    public void addCommand(Command command){
        commandList.add(command);
    }
}

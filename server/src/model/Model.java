package model;

import com.google.inject.Inject;
import comm.request.CreateGameRequest;
import comm.request.JoinGameRequest;
import modelInterfaces.base.GameInfo;
import modelInterfaces.users.User;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

/**
 * Created by Jon George on 3/7/14.
 */
public class Model extends JsonImpl {

    List<String> AITypes = new ArrayList<>();

    Set<User> users;
    List<GameInfo> games;
	@Inject
	public Model() {
        users = new HashSet<>();
        games = new ArrayList<>();
	}

    @Inject
    public void initUsers(){
        //Past Setup
        addUser("Adam", "adam");
        addUser("June", "june");

        //WWI
        addUser("Wilhelm II", "default");
        addUser("Nicholas II", "default");
        addUser("Clemenceau", "default");
        addUser("Joseph I", "default");

        //Scientific Awakening
        addUser("Newton", "default");
        addUser("Descartes", "default");
        addUser("Galileo", "default");
        addUser("Kepler", "default");

        //Renaissance (aka TMNT)
        addUser("Leonardo", "default");
        addUser("Michelangelo", "default");
        addUser("Raphael", "default");
        addUser("Donatello", "default");

        //Protestant Movement
        addUser("Luther", "default");
        addUser("Calvin", "default");
        addUser("Erasmus", "default");
        addUser("Bishop Eck", "default");

    }

    /**
     *
     * @param username
     * @param password
     * @return true if user was added, false if user already exist.
     */
    public boolean addUser(String username, String password){
        User user = findUserByName(username);
        if(user != null)
            return false;
        User newUser = InjectorFactory.getInjector().getInstance(User.class);
        newUser.setName(username);
        newUser.setPassword(password);
        users.add(newUser);
        return true;
    }

    /**
     * Checks for a certain user is registered, returns true if password matches.
     * @param username
     * @param password
     * @return true if user exists and password matches, else false
     */
    public boolean hasUser(String username, String password){
        User user = findUserByName(username);
        if(user == null)
            return false;
        if(user.getPassword().equals(password)){
            return true;
        }else{
            return false;
        }
    }

    /**
     * Looks for a user by a given username
     * @param username
     * @return if the user doesn't exist then return null
     */
    public User findUserByName(String username){
        for (User user : users) {
            if(user.getName().equals(username))
                return user;
        }
        return null;
    }

    /**
     * @return the list of games
     */
    public List<GameInfo> getGames(){
        return games;
    }

    /**
     * @return GameInfo or Null
     * @param gameId Some game id
     *
     */
    public GameInfo findGameById(int gameId) {
        for(GameInfo game : games) {
            if(game.getId() == gameId)
                return game;
        }

        // Not Found
        return null;
    }

    /**
     *
     * @return success flag
     * @param createGameRequest
     */
    public GameInfo createGame(CreateGameRequest createGameRequest){
        GameInfo newGame = InjectorFactory.getInjector().getInstance(GameInfo.class);
        newGame.setTitle(createGameRequest.getName());
        newGame.initGame(createGameRequest);

        games.add(newGame);

        return newGame;
    }

    public boolean joinGame(JoinGameRequest joinGameRequest, String userName) {
        GameInfo gameInfo = findGameById(Integer.parseInt(joinGameRequest.getId()));
        User user = findUserByName(userName);

        gameInfo.getData().addPlayer(user,joinGameRequest.getColor());
        return true;
    }

}

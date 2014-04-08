package model.facade;

import comm.request.AddAIRequest;
import model.InjectorFactory;
import model.Model;
import model.base.GameImpl;
import modelInterfaces.base.GameInfo;
import modelInterfaces.base.Player;

import java.util.List;

/**
 * Created by Jon George on 3/7/14.
 */
public class GameFacade{
    private Model m_model;

    public GameFacade(Model model) {
        m_model = model;
    }

    public boolean onAddAI(AddAIRequest addAIRequest){
        //TODO implement this method to use model
        return true;
    }


    public String onListAI(){
        return "[\"LARGEST_ARMY\"]";
    }

    public String onModelRequest(int gameId){
        GameInfo game = m_model.findGameById(gameId);
        if(game == null || game.getData() == null)
            return "";

        return game.getData().toJson();
    }
    public String onReset(int gameId){
        List<Player> players = m_model.findGameById(gameId).getData().getPlayers();
        GameImpl newGame = InjectorFactory.getInjector().getInstance(GameImpl.class);
        newGame.setPlayers(players);
        return newGame.toJson();
    }
}

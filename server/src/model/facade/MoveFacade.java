package model.facade;

import com.google.gson.Gson;
import com.google.gson.JsonSyntaxException;
import comm.moves.*;
import comm.moves.base.Commandable;
import comm.moves.base.InvalidCommandException;
import model.Model;
import modelInterfaces.base.GameInfo;

import java.io.IOException;

import static comm.moves.base.Command.moveFromJson;

/**
 * Created by Jon George on 3/7/14.
 */
public class MoveFacade {

    final String SEND_CHAT = "/moves/sendChat";
    final String ROLL_NUMBER = "/moves/rollNumber";
    final String FINISH_TURN = "/moves/finishTurn";
    final String BUY_DEV_CARD = "/moves/buyDevCard";
    final String YEAR_OF_PLENTY = "/moves/Year_of_Plenty";
    final String ROAD_BUILDING = "/moves/Road_Building";
    final String SOLDIER = "/moves/Soldier";
    final String MONOPOLY = "/moves/Monopoly";
    final String MONUMENT = "/moves/Monument";
    final String BUILD_ROAD = "/moves/buildRoad";
    final String BUILD_SETTLEMENT = "/moves/buildSettlement";
    final String BUILD_CITY = "/moves/buildCity";
    final String OFFER_TRADE = "/moves/offerTrade";
    final String ACCEPT_TRADE = "/moves/acceptTrade";
    final String DISCARD_CARDS = "/moves/discardCards";
    final String MARITIME_TRADE = "/moves/maritimeTrade";
    final String ROB_PLAYER = "/moves/robPlayer";


    private Model m_model;
    public MoveFacade(Model model) {
        m_model = model;
    }

    public String onGetCommands(int gameId){
        GameInfo game = m_model.findGameById(gameId);
        Gson gson = new Gson();
        return gson.toJson(game.getCommandList());
    }

    public boolean onPostCommands(String json, int gameId){
        m_model.findGameById(gameId);
        //TODO finish this method :D
        return true;
    }

    public boolean onMove(int gameId, String json, String type)
            throws IOException, InvalidCommandException, JsonSyntaxException {
        //TODO decide whether we want one method per move in this function
        //TODO implement this method to use model
        GameInfo game = m_model.findGameById(gameId);
        if(game == null) {
            throw new InvalidCommandException(type);
        }

        Commandable command = null;
        // ////////////////////////////////// //
        // Switching on all possible commands //
        // ////////////////////////////////// //
        switch (type) {
            case SEND_CHAT:
                command = moveFromJson(json, SendChat.class); break;
            case ROLL_NUMBER:
                command = moveFromJson(json, RollNumber.class); break;
            case FINISH_TURN:
                command = moveFromJson(json, FinishTurn.class); break;
            case BUY_DEV_CARD:
                command = moveFromJson(json, BuyDevCard.class); break;
            case YEAR_OF_PLENTY:
                command = moveFromJson(json, YearOfPlenty.class); break;
            case ROAD_BUILDING:
                command = moveFromJson(json, RoadBuilding.class); break;
            case SOLDIER:
                command = moveFromJson(json, Soldier.class); break;
            case MONOPOLY:
                command = moveFromJson(json, Monopoly.class); break;
            case MONUMENT:
                command = moveFromJson(json, Monument.class); break;
            case BUILD_ROAD:
                command = moveFromJson(json, BuildRoad.class); break;
            case BUILD_SETTLEMENT:
                command = moveFromJson(json, BuildSettlement.class); break;
            case BUILD_CITY:
                command = moveFromJson(json, BuildCity.class); break;
            case OFFER_TRADE:
			System.out.println(json);
                command = moveFromJson(json, TradeOfferCommand.class); break;
            case ACCEPT_TRADE:
                command = moveFromJson(json, AcceptTrade.class); break;
            case DISCARD_CARDS:
                command = moveFromJson(json, DiscardCards.class); break;
            case MARITIME_TRADE:
                command = moveFromJson(json, MaritimeTrade.class); break;
            case ROB_PLAYER:
                command = moveFromJson(json, RobPlayer.class); break;
            default:
                return false;
        }

        // Run this command then return OK
        command.execute(game);

        // Test game for winner
        game.getData().checkForCompletedGame();
        return true;
    }

}

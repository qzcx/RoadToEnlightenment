package route;

import com.google.gson.JsonSyntaxException;
import comm.moves.base.InvalidCommandException;
import model.facade.MoveFacade;
import spark.Request;
import spark.Response;
import spark.Route;

import java.io.IOException;

/**
 * Created by Jon George on 3/6/14.
 */
public class MoveRoute extends CoreRoute {

    private MoveFacade m_movesFacade;
    public MoveRoute(MoveFacade moveFacade) {
        m_movesFacade = moveFacade;
    }
    
    @Override
    public void attach() {
        post(new Route("/moves/*") {
            @Override
            public Object handle(Request request, Response response) {
                String json = request.body();
                String url = request.pathInfo();
                // Get Game ID
                String gameId = request.cookie("catan.game");
                if(gameId == null) {
                    response.status(401);
                    return "Unauthorized: Join a game or login first.";
                }

                // Valid game ID so we'll run the Command
                try{
                    boolean status = m_movesFacade.onMove(Integer.parseInt(gameId), json, url);
                    response.status(200);
                    return status;
                } catch (IOException e) {
                    // Server Error: Our fault
                    response.status(500);
                    return "Server Error";
                } catch (InvalidCommandException e) {
                    // Syntax Correct, but Error
                    response.status(400);
                    return "Syntactically Valid Command, but cannot be applied at this time.";
                } catch (JsonSyntaxException e) {
                    // Caused by bad json.. could not serialize
                    response.status(400);
                    return "Bad Json";
                }
            }
        });
    }
}

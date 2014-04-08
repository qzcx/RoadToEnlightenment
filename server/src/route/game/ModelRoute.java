package route.game;

import model.facade.GameFacade;
import route.CoreRoute;
import spark.Request;
import spark.Response;
import spark.Route;

/**
 * Created by Jon George on 3/6/14.
 */
public class ModelRoute extends CoreRoute{

    private GameFacade m_gameFacade;

    public ModelRoute(GameFacade gameFacade) {
        m_gameFacade = gameFacade;
    }

    @Override
    public void attach() {
        get(new Route("/game/model") {
            @Override
            public Object handle(Request request, Response response) {
                String gameIdStr = request.cookie("catan.game");
                if(gameIdStr == null) {
                    response.status(401);
                    return "Unauthorized: Please login and join a game.";
                }

                int gameId = Integer.parseInt(gameIdStr);
                String modelResponse = m_gameFacade.onModelRequest(gameId);
                return modelResponse;
            }
        });
    }
}

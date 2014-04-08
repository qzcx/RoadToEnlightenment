package route.game;

import model.facade.GameFacade;
import route.CoreRoute;
import spark.Request;
import spark.Response;
import spark.Route;

/**
 * Created by Jon George on 3/6/14.
 */
public class ResetRoute extends CoreRoute {
    private GameFacade m_gameFacade;
    public ResetRoute(GameFacade gameFacade) {
        m_gameFacade = gameFacade;
    }

    @Override
    public void attach() {
        post(new Route("/game/reset") {
            @Override
            public Object handle(Request request, Response response) {
                int gameId = Integer.parseInt(request.cookie("catan.game"));
                String modelResponse = m_gameFacade.onReset(gameId);
                return modelResponse;
            }
        });
    }
}

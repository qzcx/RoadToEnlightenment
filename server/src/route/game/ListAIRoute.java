package route.game;

import model.facade.GameFacade;
import route.CoreRoute;
import spark.Request;
import spark.Response;
import spark.Route;

/**
 * Created by Jon George on 3/6/14.
 */
public class ListAIRoute extends CoreRoute {
    private GameFacade m_gameFacade;
    public ListAIRoute(GameFacade gameFacade) {
        m_gameFacade = gameFacade;
    }
    @Override
    public void attach() {
        get(new Route("/game/listAI") {
            @Override
            public Object handle(Request request, Response response) {
                String modelResponse = m_gameFacade.onListAI();
                return modelResponse;
            }
        });
    }

}

package route.game;

import model.facade.GameFacade;
import model.facade.MoveFacade;
import route.CoreRoute;
import spark.Request;
import spark.Response;
import spark.Route;

/**
 * Created by Jon George on 3/6/14.
 */
public class CommandsRoute extends CoreRoute {
    private MoveFacade m_moveFacade;
    public CommandsRoute(MoveFacade moveFacade) {
        m_moveFacade = moveFacade;
    }
    @Override
    public void attach() {
        get(new Route("/game/commands") {
            @Override
            public Object handle(Request request, Response response) {
                int gameId = Integer.parseInt(request.cookie("catan.game"));
                String modelResponse = m_moveFacade.onGetCommands(gameId);
                return modelResponse;
            }
        });
        post(new Route("/game/commands") {
            @Override
            public Object handle(Request request, Response response) {
                String json = request.body();
                int gameId = Integer.parseInt(request.cookie("catan.game"));
                boolean modelResponse = m_moveFacade.onPostCommands(json, gameId);
                if(modelResponse){
                    return "";
                }else{
                    response.status(401);
                    return "";
                }
            }
        });
    }
}

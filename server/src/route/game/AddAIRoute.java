package route.game;

import model.facade.GameFacade;
import route.CoreRoute;
import spark.Request;
import spark.Response;
import spark.Route;
import comm.request.AddAIRequest;

/**
 * Created by Jon George on 3/6/14.
 */
public class AddAIRoute extends CoreRoute {
    private GameFacade m_gameFacade;
    public AddAIRoute(GameFacade gameFacade) {
        m_gameFacade = gameFacade;
    }

    @Override
    public void attach() {
        post(new Route("/game/addAI") {
            @Override
            public Object handle(Request request, Response response) {
                String aiType = request.queryParams("AIType");
                if (aiType == null){
                    response.status(400);
                    return("Invalid AIType");
                }

                AddAIRequest addAIRequest = new AddAIRequest(aiType);
                boolean modelResponse = m_gameFacade.onAddAI(addAIRequest);
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
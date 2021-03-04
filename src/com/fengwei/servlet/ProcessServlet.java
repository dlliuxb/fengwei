/**
 *
 */
package com.fengwei.servlet;

import java.io.IOException;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fengwei.entity.FengWeiMiaoShu;
import com.fengwei.entity.YuZhi;
import com.fengwei.service.ServicesUtil;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

/**
 * Main {@link HttpServlet} that handles the AJAX calls to backend services The
 * servlet maps to the POST method sent to the /process URL
 *
 */
@WebServlet(name = "ProcessServlet", urlPatterns = "/process", loadOnStartup = 0)
public class ProcessServlet extends HttpServlet {

	// private static final Logger LOG = Logger.getLogger(ProcessServlet.class);

	@Override
	protected void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		ProcessType process = ProcessType.extract(request);
		if (process == null) {
			returnFailure("'process' param is required.", response);
			return;
		}
		// LOG.debug("Process request " + process + " received.");
		try {
			switch (process) {
			case USER:
				execUser(request, response);
				break;
			case SEARCH:
				execSearch(request, response);
				break;
			case INSERT:
				execInsert(request, response);
				break;
			case UPDATE:
				execUpdate(request, response);
				break;
			case DELETE:
				execDelete(request, response);
				break;
			}
		} catch (Throwable t) {
			// LOG.error("An error occured while executing process " + process, t);
			returnFailure("An internal error occurred.", response);
		}
	}

	private void execUser(HttpServletRequest request, HttpServletResponse response) throws Exception {
		// TODO
		// 1, check whether user exists
		// 2, check whether password correct

	}

	private void execSearch(HttpServletRequest request, HttpServletResponse response) throws Exception {
		String entityType = request.getParameter("entityType");
		if ("fengWeiMiaoShu".equals(entityType)) {
			fengWeiMiaoShuSearch(request, response);
		} else if ("yuZhi".equals(entityType)) {
			yuZhiSearch(request, response);
		}
	}

	private void execInsert(HttpServletRequest request, HttpServletResponse response) throws Exception {
		String entityType = request.getParameter("entityType");
		if ("fengWeiMiaoShu".equals(entityType)) {
			fengWeiMiaoShuInsert(request, response);
		} else if ("yuZhi".equals(entityType)) {
			yuZhiInsert(request, response);
		}
	}

	private void execUpdate(HttpServletRequest request, HttpServletResponse response) throws Exception {
		String entityType = request.getParameter("entityType");
		if ("fengWeiMiaoShu".equals(entityType)) {
			fengWeiMiaoShuUpdate(request, response);
		} else if ("yuZhi".equals(entityType)) {
			yuZhiUpdate(request, response);
		}
	}

	private void execDelete(HttpServletRequest request, HttpServletResponse response) throws Exception {
		String entityType = request.getParameter("entityType");
		if ("fengWeiMiaoShu".equals(entityType)) {
			fengWeiMiaoShuDelete(request, response);
		} else if ("yuZhi".equals(entityType)) {
			yuZhiDelete(request, response);
		}
	}

	private void fengWeiMiaoShuSearch(HttpServletRequest request, HttpServletResponse response) throws Exception {

		String cas = request.getParameter("cas");
		String compound = request.getParameter("compound");
		String formula = request.getParameter("formula");
		String category = request.getParameter("category");
		JSONObject param = new JSONObject();
		if (cas != null)
			param.put("CAS", cas);
		if (compound != null)
			param.put("COMPOUND", compound);
		if (formula != null)
			param.put("FORMULA", formula);
		if (category != null)
			param.put("CATEGORY", category);

		ServicesUtil service = new ServicesUtil();
		List<FengWeiMiaoShu> results = service.searchFengWei(param);
		if (results != null) {
			writeResponseJson(results, response, true);
		} else {
			returnFailure("Results cannot be retrieved at this time.", response);
		}
	}

	private void yuZhiSearch(HttpServletRequest request, HttpServletResponse response) throws Exception {

		String cas = request.getParameter("cas");
		String compound = request.getParameter("compound");
		JSONObject param = new JSONObject();
		if (cas != null)
			param.put("CAS", cas);
		if (compound != null)
			param.put("COMPOUND", compound);

		ServicesUtil service = new ServicesUtil();
		List<YuZhi> results = service.searchYuZhi(param);
		if (results != null) {
			writeResponseJson(results, response, true);
		} else {
			returnFailure("Results cannot be retrieved at this time.", response);
		}
	}

	private void fengWeiMiaoShuInsert(HttpServletRequest request, HttpServletResponse response) throws Exception {

		String fengweiId = request.getParameter("FENGWEI_ID");
		String cas = request.getParameter("CAS");
		String femaNo = request.getParameter("FEMA_NO");
		String compound = request.getParameter("COMPOUND");
		String synonyms = request.getParameter("SYNONYMS");
		String formula = request.getParameter("FORMULA");
		String rin = request.getParameter("RI_N");
		String rip = request.getParameter("RI_P");
		String category = request.getParameter("CATEGORY");
		String origin = request.getParameter("ORIGIN");
		String flavorDesc = request.getParameter("FLAVOR_DESC");
		String ref = request.getParameter("REF");
		JSONObject param = new JSONObject();
		if (fengweiId != null)
			param.put("FENGWEI_ID", fengweiId);
		if (cas != null)
			param.put("CAS", cas);
		if (femaNo != null)
			param.put("FEMA_NO", femaNo);
		if (compound != null)
			param.put("COMPOUND", compound);
		if (synonyms != null)
			param.put("SYNONYMS", synonyms);
		if (formula != null)
			param.put("FORMULA", formula);
		if (rin != null)
			param.put("RI_N", rin);
		if (rip != null)
			param.put("RI_P", rip);
		if (category != null)
			param.put("CATEGORY", category);
		if (origin != null)
			param.put("ORIGIN", origin);
		if (flavorDesc != null)
			param.put("FLAVOR_DESC", flavorDesc);
		if (ref != null)
			param.put("REF", ref);

		ServicesUtil service = new ServicesUtil();
		boolean result = service.insertFengWei(param);
		if (result) {
			writeResponseJson(result, response, true);
		} else {
			returnFailure("FengWeiMiaoShu Insert failed at this time.", response);
		}
	}

	private void yuZhiInsert(HttpServletRequest request, HttpServletResponse response) throws Exception {

		String yuzhiId = request.getParameter("YUZHI_ID");
		String cas = request.getParameter("CAS");
		String compound = request.getParameter("COMPOUND");
		String thredW = request.getParameter("THRED_W");
		String definition1 = request.getParameter("DEFINITION1");
		String ref1 = request.getParameter("REF1");
		String thredA = request.getParameter("THRED_A");
		String definition2 = request.getParameter("DEFINITION2");
		String ref2 = request.getParameter("REF2");
		String thredO = request.getParameter("THRED_OTHER");
		String definition3 = request.getParameter("DEFINITION3");
		String ref3 = request.getParameter("REF3");
		JSONObject param = new JSONObject();
		if (yuzhiId != null)
			param.put("YUZHI_ID", yuzhiId);
		if (cas != null)
			param.put("CAS", cas);
		if (compound != null)
			param.put("COMPOUND", compound);
		if (thredW != null)
			param.put("THRED_W", thredW);
		if (definition1 != null)
			param.put("DEFINITION1", definition1);
		if (ref1 != null)
			param.put("REF1", ref1);
		if (thredA != null)
			param.put("THRED_A", thredA);
		if (definition2 != null)
			param.put("DEFINITION2", definition2);
		if (ref2 != null)
			param.put("REF2", ref2);
		if (thredO != null)
			param.put("THRED_OTHER", thredO);
		if (definition3 != null)
			param.put("DEFINITION3", definition3);
		if (ref3 != null)
			param.put("REF3", ref3);

		ServicesUtil service = new ServicesUtil();
		boolean result = service.insertYuZhi(param);
		if (result) {
			writeResponseJson(result, response, true);
		} else {
			returnFailure("YuZhi Insert failed at this time.", response);
		}
	}

	private void fengWeiMiaoShuUpdate(HttpServletRequest request, HttpServletResponse response) throws Exception {

		String fengweiId = request.getParameter("FENGWEI_ID");
		String cas = request.getParameter("CAS");
		String femaNo = request.getParameter("FEMA_NO");
		String compound = request.getParameter("COMPOUND");
		String synonyms = request.getParameter("SYNONYMS");
		String formula = request.getParameter("FORMULA");
		String rin = request.getParameter("RI_N");
		String rip = request.getParameter("RI_P");
		String category = request.getParameter("CATEGORY");
		String origin = request.getParameter("ORIGIN");
		String flavorDesc = request.getParameter("FLAVOR_DESC");
		String ref = request.getParameter("REF");
		JSONObject param = new JSONObject();
		if (fengweiId != null)
			param.put("FENGWEI_ID", fengweiId);
		if (cas != null)
			param.put("CAS", cas);
		if (femaNo != null)
			param.put("FEMA_NO", femaNo);
		if (compound != null)
			param.put("COMPOUND", compound);
		if (synonyms != null)
			param.put("SYNONYMS", synonyms);
		if (formula != null)
			param.put("FORMULA", formula);
		if (rin != null)
			param.put("RI_N", rin);
		if (rip != null)
			param.put("RI_P", rip);
		if (category != null)
			param.put("CATEGORY", category);
		if (origin != null)
			param.put("ORIGIN", origin);
		if (flavorDesc != null)
			param.put("FLAVOR_DESC", flavorDesc);
		if (ref != null)
			param.put("REF", ref);

		ServicesUtil service = new ServicesUtil();
		boolean result = service.updateFengWei(param);
		if (result) {
			writeResponseJson(result, response, true);
		} else {
			returnFailure("FengWeiMiaoShu Update failed at this time.", response);
		}
	}

	private void yuZhiUpdate(HttpServletRequest request, HttpServletResponse response) throws Exception {

		String yuzhiId = request.getParameter("YUZHI_ID");
		String cas = request.getParameter("CAS");
		String compound = request.getParameter("COMPOUND");
		String thredW = request.getParameter("THRED_W");
		String definition1 = request.getParameter("DEFINITION1");
		String ref1 = request.getParameter("REF1");
		String thredA = request.getParameter("THRED_A");
		String definition2 = request.getParameter("DEFINITION2");
		String ref2 = request.getParameter("REF2");
		String thredO = request.getParameter("THRED_OTHER");
		String definition3 = request.getParameter("DEFINITION3");
		String ref3 = request.getParameter("REF3");
		JSONObject param = new JSONObject();
		if (yuzhiId != null)
			param.put("YUZHI_ID", yuzhiId);
		if (cas != null)
			param.put("CAS", cas);
		if (compound != null)
			param.put("COMPOUND", compound);
		if (thredW != null)
			param.put("THRED_W", thredW);
		if (definition1 != null)
			param.put("DEFINITION1", definition1);
		if (ref1 != null)
			param.put("REF1", ref1);
		if (thredA != null)
			param.put("THRED_A", thredA);
		if (definition2 != null)
			param.put("DEFINITION2", definition2);
		if (ref2 != null)
			param.put("REF2", ref2);
		if (thredO != null)
			param.put("THRED_OTHER", thredO);
		if (definition3 != null)
			param.put("DEFINITION3", definition3);
		if (ref3 != null)
			param.put("REF3", ref3);

		ServicesUtil service = new ServicesUtil();
		boolean result = service.updateYuZhi(param);
		if (result) {
			writeResponseJson(result, response, true);
		} else {
			returnFailure("YuZhi Update failed at this time.", response);
		}
	}

	private void fengWeiMiaoShuDelete(HttpServletRequest request, HttpServletResponse response) throws Exception {

		String fengweiId = request.getParameter("FENGWEI_ID");
		JSONObject param = new JSONObject();
		if (fengweiId != null)
			param.put("FENGWEI_ID", fengweiId);

		ServicesUtil service = new ServicesUtil();
		boolean result = service.deleteFengWei(param);
		if (result) {
			writeResponseJson(result, response, true);
		} else {
			returnFailure("FengWeiMiaoShu Delete failed at this time.", response);
		}
	}

	private void yuZhiDelete(HttpServletRequest request, HttpServletResponse response) throws Exception {

		String yuzhiId = request.getParameter("YUZHI_ID");
		JSONObject param = new JSONObject();
		if (yuzhiId != null)
			param.put("YUZHI_ID", yuzhiId);

		ServicesUtil service = new ServicesUtil();
		boolean result = service.deleteYuZhi(param);
		if (result) {
			writeResponseJson(result, response, true);
		} else {
			returnFailure("YuZhi Delete failed at this time.", response);
		}
	}

	/**
	 * Writes a JSON response back to the caller
	 *
	 * @param serviceResponse
	 * @param httpResponse
	 * @throws IOException
	 */
	@SuppressWarnings("deprecation")
	protected void writeResponseJson(Object serviceResponse, HttpServletResponse httpResponse, boolean asArray)
			throws IOException {
		ObjectMapper mapper = new ObjectMapper();
		String outJson = mapper.writeValueAsString(serviceResponse);
		JSONObject responseJson = new JSONObject();
		responseJson.put("success", true);
		responseJson.put("msg", "");
		responseJson.put("data", asArray ? JSONArray.fromObject(outJson) : JSONObject.fromObject(outJson));
		httpResponse.setContentType("application/json");
		httpResponse.getOutputStream().write(mapper.writeValueAsBytes(responseJson));
	}

	protected void writeResponseJson(boolean result, HttpServletResponse httpResponse, boolean asArray)
			throws IOException {
		ObjectMapper mapper = new ObjectMapper();
		JSONObject responseJson = new JSONObject();
		responseJson.put("success", true);
		responseJson.put("msg", "");
		responseJson.put("data", result);
		httpResponse.setContentType("application/json");
		httpResponse.getOutputStream().write(mapper.writeValueAsBytes(responseJson));
	}

	protected void writeResponseJson(Object serviceResponse, HttpServletResponse httpResponse) throws IOException {
		writeResponseJson(serviceResponse, httpResponse, false);
	}

	/**
	 * Writes a response failure JSON back to the caller
	 *
	 * @param serviceResponse
	 * @param response
	 * @throws IOException
	 */
	protected void returnFailure(String errorMessage, HttpServletResponse response) throws IOException {
		ObjectMapper mapper = new ObjectMapper();
		JSONObject responseJson = new JSONObject();
		responseJson.put("success", false);
		responseJson.put("msg", errorMessage);
		responseJson.put("data", "");
		response.setContentType("application/json");
		response.getOutputStream().write(mapper.writeValueAsBytes(responseJson));
	}

}

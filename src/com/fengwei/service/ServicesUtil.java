package com.fengwei.service;

import java.io.IOException;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

import javax.activation.MimetypesFileTypeMap;

import com.fasterxml.jackson.core.JsonGenerationException;
import com.fengwei.entity.FengWeiMiaoShu;
import com.fengwei.entity.YuZhi;

import net.sf.json.JSONObject;

/**
 * Utility to execute REST web service calls to the external services
 *
 * @author JeffZAMORA
 *
 */
@SuppressWarnings("deprecation")
public class ServicesUtil {

	// private static final Logger LOG = Logger.getLogger(ServicesUtil.class);
	private static final MimetypesFileTypeMap MIME_TYPES = new MimetypesFileTypeMap();

	/**
	 * Testing method for dev local runs.
	 *
	 * @param args
	 * @throws Exception
	 */
	public static void main(String[] args) throws Exception {

		JSONObject param = new JSONObject();
		// param.add("CAS", "100-22-1");
		// param.add("COMPOUND", "Tetramethyl");
		// param.add("FORMULA", "C10H16N2");
		// param.add("CATEGORY", "Crustaceans");
		searchFengWei(param);

	}

	public static List<FengWeiMiaoShu> searchFengWei(JSONObject params) throws JsonGenerationException, IOException {
		// LOG.trace("searchFengWei..");
		List<FengWeiMiaoShu> result = Jdbc.searchFengWei(params);
		return result;
	}

	public static boolean insertFengWei(JSONObject params) throws JsonGenerationException, IOException {
		// LOG.trace("updateFengWei..");
		boolean result = Jdbc.insertFengWei(params);
		return result;
	}

	public static boolean updateFengWei(JSONObject params) throws JsonGenerationException, IOException {
		// LOG.trace("updateFengWei..");
		boolean result = Jdbc.updateFengWei(params);
		return result;
	}

	public static boolean deleteFengWei(JSONObject params) throws JsonGenerationException, IOException {
		// LOG.trace("deleteFengWei..");
		boolean result = Jdbc.deleteFengWei(params);
		return result;
	}

	public static List<YuZhi> searchYuZhi(JSONObject params) throws JsonGenerationException, IOException {
		// LOG.trace("searchYuZhi..");
		List<YuZhi> result = Jdbc.searchYuZhi(params);
		return result;
	}

	public static boolean insertYuZhi(JSONObject params) throws JsonGenerationException, IOException {
		// LOG.trace("updateYuZhi..");
		boolean result = Jdbc.insertYuZhi(params);
		return result;
	}

	public static boolean updateYuZhi(JSONObject params) throws JsonGenerationException, IOException {
		// LOG.trace("updateYuZhi..");
		boolean result = Jdbc.updateYuZhi(params);
		return result;
	}

	public static boolean deleteYuZhi(JSONObject params) throws JsonGenerationException, IOException {
		// LOG.trace("deleteYuZhi..");
		boolean result = Jdbc.deleteYuZhi(params);
		return result;
	}

	public JSONObject executeService(JSONObject request, String serviceSubUrl) throws IOException {
		System.out.println("executeService..");
		return null;
	}

	public static FengWeiMiaoShu mapResult2FengWei(ResultSet rs) throws SQLException {
		FengWeiMiaoShu record = new FengWeiMiaoShu();
		record.setFengweiId(rs.getLong("FENGWEI_ID"));
		record.setCas(rs.getString("CAS") != null ? rs.getString("CAS") : "");
		record.setFemaNo(rs.getInt("FEMA_NO"));
		record.setCompound(rs.getString("COMPOUND") != null ? rs.getString("COMPOUND") : "");
		record.setSynonyms(rs.getString("SYNONYMS") != null ? rs.getString("SYNONYMS") : "");
		record.setFormula(rs.getString("FORMULA") != null ? rs.getString("FORMULA") : "");
		record.setRin(rs.getString("RI_N") != null ? rs.getString("RI_N") : "");
		record.setRip(rs.getString("RI_P") != null ? rs.getString("RI_P") : "");
		record.setCategory(rs.getString("CATEGORY") != null ? rs.getString("CATEGORY") : "");
		record.setOrigin(rs.getString("ORIGIN") != null ? rs.getString("ORIGIN") : "");
		record.setFlavorDesc(rs.getString("FLAVOR_DESC") != null ? rs.getString("FLAVOR_DESC") : "");
		record.setRef(rs.getString("REF") != null ? rs.getString("REF") : "");
		return record;
	}

	public static YuZhi mapResult2YuZhi(ResultSet rs) throws SQLException {
		YuZhi record = new YuZhi();
		record.setYuzhiId(rs.getLong("YUZHI_ID"));
		record.setCas(rs.getString("CAS") != null ? rs.getString("CAS") : "");
		record.setCompound(rs.getString("COMPOUND") != null ? rs.getString("COMPOUND") : "");
		record.setThredW(rs.getString("THRED_W") != null ? rs.getString("THRED_W") : "");
		record.setDefinition1(rs.getString("DEFINITION1") != null ? rs.getString("DEFINITION1") : "");
		record.setRef1(rs.getString("REF1") != null ? rs.getString("REF1") : "");
		record.setThredA(rs.getString("THRED_A") != null ? rs.getString("THRED_A") : "");
		record.setDefinition2(rs.getString("DEFINITION2") != null ? rs.getString("DEFINITION2") : "");
		record.setRef2(rs.getString("REF2") != null ? rs.getString("REF2") : "");
		record.setThredO(rs.getString("THRED_OTHER") != null ? rs.getString("THRED_OTHER") : "");
		record.setDefinition3(rs.getString("DEFINITION3") != null ? rs.getString("DEFINITION3") : "");
		record.setRef3(rs.getString("REF3") != null ? rs.getString("REF3") : "");
		return record;
	}

	public static JSONObject convertString2Json(String rs) {
		JSONObject records = new JSONObject();

		return records;
	}

}

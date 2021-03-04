package com.fengwei.service;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

import com.fengwei.entity.FengWeiMiaoShu;
import com.fengwei.entity.YuZhi;
import com.mysql.cj.util.StringUtils;

import net.sf.json.JSONObject;

public class Jdbc {
	public static void main(String args[]) {
		try {
			Class.forName("com.mysql.jdbc.Driver");
			// Class.forName("org.gjt.mm.mysql.Driver");
			System.out.println("Success loading Mysql Driver!");
		} catch (Exception e) {
			System.out.print("Error loading Mysql Driver!");
			e.printStackTrace();
		}
		try {
			Connection connect = DriverManager.getConnection("jdbc:mysql://localhost:3306/fengwei", "fengwei",
					"fengwei123@DD");

			System.out.println("Success connect Mysql server!");
			Statement stmt = connect.createStatement();
			ResultSet rs = stmt.executeQuery("select * from fengwei_miaoshu");

			while (rs.next()) {
				System.out.println(rs.getString("cas"));
			}
		} catch (Exception e) {
			System.out.print("get data error!");
			e.printStackTrace();
		}
	}

	public static List<FengWeiMiaoShu> searchFengWei(JSONObject params) {
		List<FengWeiMiaoShu> output = new ArrayList<FengWeiMiaoShu>();
		FengWeiMiaoShu fengWeiMiaoShu = null;
		try {
			Class.forName("com.mysql.jdbc.Driver");
			// Class.forName("org.gjt.mm.mysql.Driver");
			System.out.println("Success loading Mysql Driver!");
		} catch (Exception e) {
			System.out.print("Error loading Mysql Driver!");
			e.printStackTrace();
		}
		try {
			Connection connect = DriverManager.getConnection("jdbc:mysql://localhost:3306/fengwei", "fengwei",
					"fengwei123@DD");

			System.out.println("Success connect Mysql server!");
			Statement stmt = connect.createStatement();

			String sql = "select FENGWEI_ID, CAS, FEMA_NO, COMPOUND, SYNONYMS, FORMULA, RI_N, RI_P, CATEGORY, ORIGIN, FLAVOR_DESC, REF from fengwei.fengwei_miaoshu";
			String cas = params.get("CAS") != null ? params.get("CAS").toString() : "";
			String compound = params.get("COMPOUND") != null ? params.get("COMPOUND").toString() : "";
			String formula = params.get("FORMULA") != null ? params.get("FORMULA").toString() : "";
			String category = params.get("CATEGORY") != null ? params.get("CATEGORY").toString() : "";
			if (params != null && !params.isEmpty()) {
				sql += " where ";
			}
			if (!cas.isEmpty() && !"".equals(cas)) {
				sql += " CAS like '%" + cas + "%'";
			}
			if (!compound.isEmpty() && !"".equals(compound)) {
				if (!cas.isEmpty()) {
					sql += " AND COMPOUND like '%" + compound + "%'";
				} else {
					sql += " COMPOUND like '%" + compound + "%'";
				}
			}
			if (!formula.isEmpty() && !"".equals(formula)) {
				if (!cas.isEmpty() || !compound.isEmpty()) {
					sql += " AND FORMULA like '%" + formula + "%'";
				} else {
					sql += " FORMULA like '%" + formula + "%'";
				}
			}
			if (!category.isEmpty() && !"".equals(category)) {
				if (!cas.isEmpty() || !compound.isEmpty() || !formula.isEmpty()) {
					sql += " AND CATEGORY like '%" + category + "%'";
				} else {
					sql += " CATEGORY like '%" + category + "%'";
				}
			}
			sql = sql.replace("\"", "");

			ResultSet rs = stmt.executeQuery(sql);

			while (rs.next()) {
				fengWeiMiaoShu = ServicesUtil.mapResult2FengWei(rs);
				output.add(fengWeiMiaoShu);
				System.out.println(rs.getString("cas"));
			}
			rs.close();
			stmt.close();
			connect.close();
		} catch (Exception e) {
			System.out.print("get data error!");
			e.printStackTrace();
		}
		return output;
	}

	public static List<YuZhi> searchYuZhi(JSONObject params) {
		List<YuZhi> output = new ArrayList<YuZhi>();
		YuZhi yuZhi = null;
		try {
			Class.forName("com.mysql.jdbc.Driver");
			// Class.forName("org.gjt.mm.mysql.Driver");
			System.out.println("Success loading Mysql Driver!");
		} catch (Exception e) {
			System.out.print("Error loading Mysql Driver!");
			e.printStackTrace();
		}
		try {
			Connection connect = DriverManager.getConnection("jdbc:mysql://localhost:3306/fengwei", "fengwei",
					"fengwei123@DD");

			System.out.println("Success connect Mysql server!");
			Statement stmt = connect.createStatement();

			String sql = "select YUZHI_ID, CAS, COMPOUND, THRED_W, DEFINITION1, REF1, THRED_A, DEFINITION2, REF2, THRED_OTHER, DEFINITION3, REF3 from fengwei.yuzhi";
			String cas = params.get("CAS") != null ? params.get("CAS").toString() : "";
			String compound = params.get("COMPOUND") != null ? params.get("COMPOUND").toString() : "";
			if (params != null && !params.isEmpty()) {
				sql += " where ";
			}
			if (!cas.isEmpty() && !"".equals(cas)) {
				sql += " CAS like '%" + cas + "%'";
			}
			if (!compound.isEmpty() && !"".equals(compound)) {
				if (!cas.isEmpty()) {
					sql += " AND COMPOUND like '%" + compound + "%'";
				} else {
					sql += " COMPOUND like '%" + compound + "%'";
				}
			}
			sql = sql.replace("\"", "");

			ResultSet rs = stmt.executeQuery(sql);

			while (rs.next()) {
				yuZhi = ServicesUtil.mapResult2YuZhi(rs);
				output.add(yuZhi);
				System.out.println(rs.getString("cas"));
			}
			rs.close();
			stmt.close();
			connect.close();
		} catch (Exception e) {
			System.out.print("get data error!");
			e.printStackTrace();
		}
		return output;
	}

	public static boolean insertFengWei(JSONObject params) {
		try {
			Class.forName("com.mysql.jdbc.Driver");
			// Class.forName("org.gjt.mm.mysql.Driver");
			System.out.println("Success loading Mysql Driver!");
		} catch (Exception e) {
			System.out.print("Error loading Mysql Driver!");
			e.printStackTrace();
		}
		try {
			Connection connect = DriverManager.getConnection("jdbc:mysql://localhost:3306/fengwei", "fengwei",
					"fengwei123@DD");

			System.out.println("Success connect Mysql server!");
			Statement stmt = connect.createStatement();

			String fengweiId = params.get("FENGWEI_ID") != null ? params.get("FENGWEI_ID").toString() : "";
			String cas = params.get("CAS") != null ? params.get("CAS").toString() : "";
			String femaNoStr = params.get("FEMA_NO") != null ? params.get("FEMA_NO").toString() : "";
			int femaNo = !StringUtils.isNullOrEmpty(femaNoStr) ? Integer.valueOf(femaNoStr) : null;
			String compound = params.get("COMPOUND") != null ? params.get("COMPOUND").toString() : "";
			String synonyms = params.get("SYNONYMS") != null ? params.get("SYNONYMS").toString() : "";
			String formula = params.get("FORMULA") != null ? params.get("FORMULA").toString() : "";
			String rin = params.get("RI_N") != null ? params.get("RI_N").toString() : "";
			String rip = params.get("RI_P") != null ? params.get("RI_P").toString() : "";
			String category = params.get("CATEGORY") != null ? params.get("CATEGORY").toString() : "";
			String origin = params.get("ORIGIN") != null ? params.get("ORIGIN").toString() : "";
			String flavorDesc = params.get("FLAVOR_DESC") != null ? params.get("FLAVOR_DESC").toString() : "";
			String ref = params.get("REF") != null ? params.get("REF").toString() : "";

			String getMaxFengWeiIdSql = "select max(FENGWEI_ID) + 1 as m from fengwei.fengwei_miaoshu";

			ResultSet rs = stmt.executeQuery(getMaxFengWeiIdSql);

			while (rs.next()) {
				fengweiId = rs.getString("m");
			}
			System.out.println("next max fengweiId = " + fengweiId);

			String sql = "INSERT INTO fengwei.fengwei_miaoshu (FENGWEI_ID, CAS,FEMA_NO, COMPOUND, SYNONYMS, FORMULA, RI_N, RI_P, CATEGORY, ORIGIN, FLAVOR_DESC, REF) VALUES ("
					+ fengweiId + ", \"" + cas + "\", " + femaNo + " , \"" + compound + "\", \"" + synonyms + "\", \""
					+ formula + "\", \"" + rin + "\", \"" + rip + "\", \"" + category + "\", \"" + origin + "\", \""
					+ flavorDesc + "\", \"" + ref + "\");";

			System.out.println(sql);

			stmt.execute(sql);

			rs.close();
			stmt.close();
			connect.close();
		} catch (Exception e) {
			System.out.print("get data error!");
			e.printStackTrace();
			return false;
		}
		return true;
	}

	public static boolean insertYuZhi(JSONObject params) {
		try {
			Class.forName("com.mysql.jdbc.Driver");
			// Class.forName("org.gjt.mm.mysql.Driver");
			System.out.println("Success loading Mysql Driver!");
		} catch (Exception e) {
			System.out.print("Error loading Mysql Driver!");
			e.printStackTrace();
		}
		try {
			Connection connect = DriverManager.getConnection("jdbc:mysql://localhost:3306/fengwei", "fengwei",
					"fengwei123@DD");

			System.out.println("Success connect Mysql server!");
			Statement stmt = connect.createStatement();

			String yuzhiId = null;
			String cas = params.get("CAS") != null ? params.get("CAS").toString() : "";
			String compound = params.get("COMPOUND") != null ? params.get("COMPOUND").toString() : "";
			String thredW = params.get("THRED_W") != null ? params.get("THRED_W").toString() : "";
			String definition1 = params.get("DEFINITION1") != null ? params.get("DEFINITION1").toString() : "";
			String ref1 = params.get("REF1") != null ? params.get("REF1").toString() : "";
			String thredA = params.get("THRED_A") != null ? params.get("THRED_A").toString() : "";
			String definition2 = params.get("DEFINITION2") != null ? params.get("DEFINITION2").toString() : "";
			String ref2 = params.get("REF2") != null ? params.get("REF2").toString() : "";
			String thredO = params.get("THRED_OTHER") != null ? params.get("THRED_OTHER").toString() : "";
			String definition3 = params.get("DEFINITION3") != null ? params.get("DEFINITION3").toString() : "";
			String ref3 = params.get("REF3") != null ? params.get("REF3").toString() : "";

			String getMaxYuZhiIdSql = "select max(YUZHI_ID) + 1 as m from fengwei.yuzhi";

			ResultSet rs = stmt.executeQuery(getMaxYuZhiIdSql);

			while (rs.next()) {
				yuzhiId = rs.getString("m");
			}
			System.out.println("next max yuzhiId = " + yuzhiId);

			String sql = "INSERT INTO fengwei.yuzhi (YUZHI_ID, CAS, COMPOUND, THRED_W, DEFINITION1, REF1, THRED_A, DEFINITION2, REF2, THRED_OTHER, DEFINITION3, REF3) VALUES ("
					+ yuzhiId + ", \"" + cas + "\", \"" + compound + "\" , \"" + thredW + "\", \"" + definition1
					+ "\", \"" + ref1 + "\", \"" + thredA + "\", \"" + definition2 + "\", \"" + ref2 + "\", \"" + thredO
					+ "\", \"" + definition3 + "\", \"" + ref3 + "\");";

			System.out.println(sql);

			stmt.execute(sql);

			rs.close();
			stmt.close();
			connect.close();
		} catch (Exception e) {
			System.out.print("get data error!");
			e.printStackTrace();
			return false;
		}
		return true;
	}

	public static boolean updateFengWei(JSONObject params) {
		try {
			Class.forName("com.mysql.jdbc.Driver");
			// Class.forName("org.gjt.mm.mysql.Driver");
			System.out.println("Success loading Mysql Driver!");
		} catch (Exception e) {
			System.out.print("Error loading Mysql Driver!");
			e.printStackTrace();
		}
		try {
			Connection connect = DriverManager.getConnection("jdbc:mysql://localhost:3306/fengwei", "fengwei",
					"fengwei123@DD");

			System.out.println("Success connect Mysql server!");
			Statement stmt = connect.createStatement();

			String fengweiId = params.get("FENGWEI_ID") != null ? params.get("FENGWEI_ID").toString() : "";
			String cas = params.get("CAS") != null ? params.get("CAS").toString() : "";
			String femaNo = params.get("FEMA_NO") != null ? params.get("FEMA_NO").toString() : "";
			String compound = params.get("COMPOUND") != null ? params.get("COMPOUND").toString() : "";
			String synonyms = params.get("SYNONYMS") != null ? params.get("SYNONYMS").toString() : "";
			String formula = params.get("FORMULA") != null ? params.get("FORMULA").toString() : "";
			String rin = params.get("RI_N") != null ? params.get("RI_N").toString() : "";
			String rip = params.get("RI_P") != null ? params.get("RI_P").toString() : "";
			String category = params.get("CATEGORY") != null ? params.get("CATEGORY").toString() : "";
			String origin = params.get("ORIGIN") != null ? params.get("ORIGIN").toString() : "";
			String flavorDesc = params.get("FLAVOR_DESC") != null ? params.get("FLAVOR_DESC").toString() : "";
			String ref = params.get("REF") != null ? params.get("REF").toString() : "";

			String sql = "update fengwei.fengwei_miaoshu set CAS=\"" + cas + "\", FEMA_NO=\"" + femaNo
					+ "\", COMPOUND=\"" + compound + "\", SYNONYMS=\"" + synonyms + "\", FORMULA=\"" + formula
					+ "\", RI_N=\"" + rin + "\", RI_P=\"" + rip + "\", CATEGORY=\"" + category + "\", ORIGIN=\""
					+ origin + "\", FLAVOR_DESC=\"" + flavorDesc + "\", REF=\"" + ref + "\" where FENGWEI_ID="
					+ fengweiId;

			// sql = sql.replace("\"", "");

			System.out.println(sql);

			stmt.execute(sql);

			stmt.close();
			connect.close();
		} catch (Exception e) {
			System.out.print("get data error!");
			e.printStackTrace();
		}
		return true;
	}

	public static boolean updateYuZhi(JSONObject params) {
		try {
			Class.forName("com.mysql.jdbc.Driver");
			// Class.forName("org.gjt.mm.mysql.Driver");
			System.out.println("Success loading Mysql Driver!");
		} catch (Exception e) {
			System.out.print("Error loading Mysql Driver!");
			e.printStackTrace();
		}
		try {
			Connection connect = DriverManager.getConnection("jdbc:mysql://localhost:3306/fengwei", "fengwei",
					"fengwei123@DD");

			System.out.println("Success connect Mysql server!");
			Statement stmt = connect.createStatement();

			String yuzhiId = params.get("YUZHI_ID") != null ? params.get("YUZHI_ID").toString() : "";
			String cas = params.get("CAS") != null ? params.get("CAS").toString() : "";
			String compound = params.get("COMPOUND") != null ? params.get("COMPOUND").toString() : "";
			String thredW = params.get("THRED_W") != null ? params.get("THRED_W").toString() : "";
			String definition1 = params.get("DEFINITION1") != null ? params.get("DEFINITION1").toString() : "";
			String ref1 = params.get("REF1") != null ? params.get("REF1").toString() : "";
			String thredA = params.get("THRED_A") != null ? params.get("THRED_A").toString() : "";
			String definition2 = params.get("DEFINITION2") != null ? params.get("DEFINITION2").toString() : "";
			String ref2 = params.get("REF2") != null ? params.get("REF2").toString() : "";
			String thredO = params.get("THRED_OTHER") != null ? params.get("THRED_OTHER").toString() : "";
			String definition3 = params.get("DEFINITION3") != null ? params.get("DEFINITION3").toString() : "";
			String ref3 = params.get("REF3") != null ? params.get("REF3").toString() : "";

			String sql = "update fengwei.yuzhi set CAS=\"" + cas + "\", COMPOUND=\"" + compound + "\", THRED_W=\""
					+ thredW + "\", DEFINITION1=\"" + definition1 + "\", REF1=\"" + ref1 + "\", THRED_A=\"" + thredA
					+ "\", DEFINITION2=\"" + definition2 + "\", REF2=\"" + ref2 + "\", THRED_OTHER=\"" + thredO
					+ "\", DEFINITION3=\"" + definition3 + "\", REF3=\"" + ref3 + "\" where YUZHI_ID=" + yuzhiId;

			// sql = sql.replace("\"", "");

			System.out.println(sql);

			stmt.execute(sql);

			stmt.close();
			connect.close();
		} catch (Exception e) {
			System.out.print("get data error!");
			e.printStackTrace();
		}
		return true;
	}

	public static boolean deleteFengWei(JSONObject params) {
		try {
			Class.forName("com.mysql.jdbc.Driver");
			// Class.forName("org.gjt.mm.mysql.Driver");
			System.out.println("Success loading Mysql Driver!");
		} catch (Exception e) {
			System.out.print("Error loading Mysql Driver!");
			e.printStackTrace();
		}
		try {
			Connection connect = DriverManager.getConnection("jdbc:mysql://localhost:3306/fengwei", "fengwei",
					"fengwei123@DD");

			System.out.println("Success connect Mysql server!");
			Statement stmt = connect.createStatement();

			String fengweiId = params.get("FENGWEI_ID") != null ? params.get("FENGWEI_ID").toString() : "";
			String sql = "delete from fengwei.fengwei_miaoshu where FENGWEI_ID=" + fengweiId;

			System.out.println(sql);

			stmt.executeUpdate(sql);

			stmt.close();
			connect.close();
		} catch (Exception e) {
			System.out.print("get data error!");
			e.printStackTrace();
		}
		return true;
	}

	public static boolean deleteYuZhi(JSONObject params) {
		try {
			Class.forName("com.mysql.jdbc.Driver");
			// Class.forName("org.gjt.mm.mysql.Driver");
			System.out.println("Success loading Mysql Driver!");
		} catch (Exception e) {
			System.out.print("Error loading Mysql Driver!");
			e.printStackTrace();
		}
		try {
			Connection connect = DriverManager.getConnection("jdbc:mysql://localhost:3306/fengwei", "fengwei",
					"fengwei123@DD");

			System.out.println("Success connect Mysql server!");
			Statement stmt = connect.createStatement();

			String yuzhiId = params.get("YUZHI_ID") != null ? params.get("YUZHI_ID").toString() : "";
			String sql = "delete from fengwei.yuzhi where YUZHI_ID=" + yuzhiId;

			System.out.println(sql);

			stmt.executeUpdate(sql);

			stmt.close();
			connect.close();
		} catch (Exception e) {
			System.out.print("get data error!");
			e.printStackTrace();
		}
		return true;
	}

}
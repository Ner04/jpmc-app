package com.example.myjwt.models;

import javax.persistence.*;

import com.example.myjwt.models.audit.UserDateAudit;
import com.example.myjwt.models.enm.EGrade;
import com.fasterxml.jackson.annotation.JsonAutoDetect;
import com.fasterxml.jackson.annotation.JsonAutoDetect.Visibility;

@Entity
@Table(name = "evaluationresultcategory", uniqueConstraints = { @UniqueConstraint(columnNames = "id") })
@JsonAutoDetect(fieldVisibility = Visibility.ANY)
public class EvaluationResultCategory extends UserDateAudit {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Column(length = 30)
	private String resultCategory;

	@Column(length = 30)
	private String description;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}



	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public EvaluationResultCategory() {

	}

	public String getResultCategory() {
		return resultCategory;
	}

	public void setResultCategory(String resultCategory) {
		this.resultCategory = resultCategory;
	}
}